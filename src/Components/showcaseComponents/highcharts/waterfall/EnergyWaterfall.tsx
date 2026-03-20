// src/components/LossWaterfall.tsx
import { Box, Typography } from "@mui/material";
import * as Highcharts from "highcharts";
import "highcharts/highcharts-more";
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import EditIcon from "../../../../Images/pojectImages/showCaseImages/edit.svg";
import ExpandLess from "../../../../Images/pojectImages/showCaseImages/expand_less.svg";
import ExpandMore from "../../../../Images/pojectImages/showCaseImages/expand_more.svg";
import { baseData } from "./lossBaseData";


// ---------------- TYPES ----------------
export interface LossData {
    id: string;
    category: string;
    open: number;
    step: number;
    valueLabel?: string;
    lossPercent?: string;
    color?: string;
    childData?: LossData[];
}

// ---------------- HELPERS ----------------
const getVisibleNodes = (
    nodes: LossData[],
    expanded: Set<string>
): LossData[] => {
    const result: LossData[] = [];

    const walk = (node: LossData) => {
        result.push(node);

        if (expanded.has(node.id) && node.childData) {
            // sort ONLY siblings
            const children = [...node.childData].sort((a, b) =>
                a.id.localeCompare(b.id)
            );
            children.forEach(walk);
        }
    };

    nodes.forEach(walk);

    return result;
};

// legends data
const LEGENDS = [
    {
        color: '#0042C4',
        name: 'Expected Energy Output'
    },
    {
        color: '#8A2330',
        name: 'Main Losses'
    },
    {
        color: '#CF4848',
        name: 'Sub Bucket Losses'
    },
    {
        color: '#64D6FF',
        name: 'Actual Generation'
    },

]


// ---------------- COMPONENT ----------------
export default function LossWaterfall(): JSX.Element {
    const chartRef = useRef<Highcharts.Chart | null>(null);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["1-1"]));
    const [lossData, setLossData] = useState<LossData[]>(baseData);

    // ---------------- DERIVED DATA ----------------
    const visibleNodes = useMemo(
        () => {
            return getVisibleNodes(lossData, expandedIds)
        },
        [lossData, expandedIds]
    );

    const seriesData = useMemo(() => {
        if (visibleNodes.length === 0) return []
        return visibleNodes.map((d, index) => ({
            x: index,
            id: d.id,
            low: d.open,
            high: d.step - d.open === 0 ? d.step + 1 : d.step,
            color: d.color,
            valueLabel: d.valueLabel,
            lossPercent: d.lossPercent
        }));
    }, [visibleNodes]);


    //Dynamic height based on visible rows
    const ROW_HEIGHT = 38;
    const chartHeight = Math.max(140, visibleNodes.length * ROW_HEIGHT + ROW_HEIGHT);


    // ---------------- CHART ----------------
    useEffect(() => {
        if (seriesData.length === 0) return;
        const labelFormatter = function (
            this: Highcharts.AxisLabelsFormatterContextObject,
        ) {
            const node = visibleNodes[this.pos];
            if (!node) return "";

            const depth = node.id.split("-").length - 1;
            const hasChildren = !!node.childData?.length;
            const isRoot = depth === 0;
            const isExpanded = expandedIds.has(node.id);

            const less = ExpandLess;
            const more = ExpandMore;

            return `
                    <div
                    class="loss-axis-label"
                    id="${node.id}"
                    style="
                        display:flex;
                        align-items:center;
                        justify-content:start;
                        padding-left:16px;
                        width:350px !important;
                        min-height:37px;
                        height:auto;
                        flex: 1 1 auto;
                        white-space: normal;
                        word-break: break-word;
                        font-size:14px;
                        font-weight:${isRoot ? 600 : 400};
                        line-height:${isRoot ? "29px" : "140%"};
                        color:${isRoot ? "#ECF1FB" : "#FFFFFF"};
                        cursor:${hasChildren && !isRoot ? "pointer" : 'default'};
                        box-sizing:border-box;
                        border-bottom:1px solid var(--Background-B5, #2C3045);
                        background-color:${hasChildren && !isRoot && isExpanded ? "#2C3045" : depth > 1 ? "#1A1E32" : null};
                        flex-direction:row;
                    "
                    >
                    ${!isRoot ? (
                    hasChildren
                        ? `
                                <img
                                src="${isExpanded ? less : more}"
                                style="width:20px;height:20px;max-width:20px;"
                                />
                            `
                        : `<span style="flex: 0 0 ${depth > 1 ? 28 : 20}px; min-width:${depth > 1 ? 28 : 20}px;border-right:${depth > 1 ? "1px solid var(--Background-B5, #2C3045)" : "none"};height:36px;"></span>`
                ) : ""
                }

                    <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex: 1 1 auto;min-width: 0;padding-left:${depth > 0 ? 6 : 0}px;text-align:left;">
                        ${node.category}
                    </span>
                    </div>
                `;
        };


        // Bind click using Highcharts lifecycle
        const bindLabelClicks = (chart: Highcharts.Chart) => {
            const axis = chart.xAxis[0];
            if (!axis?.ticks) return;

            Object.values(axis.ticks).forEach((tick: any) => {
                const el = tick.label?.element;
                if (!el) return;

                if ((el as any).__bound) return;
                (el as any).__bound = true;

                el.onclick = () => {
                    const node = visibleNodes[tick.pos];
                    if (!node) return;
                    const hasChildren = !!node.childData?.length;
                    const depth = node.id.split("-").length - 1;
                    const isRoot = depth === 0;
                    if (hasChildren && !isRoot) {
                        setExpandedIds((prev) => {
                            const next = new Set(prev);
                            next.has(node.id)
                                ? next.delete(node.id)
                                : next.add(node.id);
                            return next;
                        });
                    }
                };
                el.onmouseenter = () => {
                    const point = chart.series[0].points[tick.pos];
                    point?.setState("hover");
                };

                el.onmouseleave = () => {
                    const point = chart.series[0].points[tick.pos];
                    point?.setState("");
                };

            });
        };

        const bindEditIconClicks = () => {
            document.querySelectorAll(".loss-edit-icon").forEach(el => {
                if ((el as any).__bound) return;
                (el as any).__bound = true;

                el.addEventListener("click", e => {
                    e.stopPropagation();
                    const id = (e.currentTarget as HTMLElement).id;
                    if (!id) return;

                    handleEditClick(id);
                });
            });
        };

        const handleEditClick = (id: string) => {
            console.log('edit icon clicked: ', id)
        }
        const plotBands: Highcharts.XAxisPlotBandsOptions[] =
            visibleNodes.map((node, index) => {
                const depth = node.id.split("-").length - 1;
                const hasChildren = !!node.childData?.length;
                const isRoot = depth === 0;
                const isExpanded = expandedIds.has(node.id);


                return {
                    from: index - 0.5,
                    to: index + 0.5,
                    color: hasChildren && !isRoot && isExpanded ? "#2C3045" : depth > 1 ? "#1A1E32" : "#131521",
                    zIndex: 0,
                    // borderColor: "#2C3045",
                    // borderWidth: 1,
                };
            });


        const categories = visibleNodes.map((d) => d.category);
        // ---------------- CREATE CHART ----------------
        const calculatedMax = seriesData.length
            ? Math.max(...seriesData.map(d => d.high)) * 1.15
            : null;

        if (!chartRef.current) {
            chartRef.current = Highcharts.chart("loss-waterfall", {
                chart: {
                    type: "columnrange",
                    inverted: true,
                    backgroundColor: "transparent",
                    height: chartHeight,
                    marginLeft: 350,
                    events: {
                        render() {
                            bindLabelClicks(this);
                            bindEditIconClicks();
                            const chart = this;
                            const c = chart as any;
                            if (c.xAxisBg) c.xAxisBg.destroy();

                            c.xAxisBg = chart.renderer
                                .rect(
                                    0,
                                    -2,
                                    chart.chartWidth,
                                    ROW_HEIGHT - 1
                                )
                                .attr({
                                    fill: "#1B1E33",
                                    zIndex: -1,
                                })
                                .add();
                        }
                    }
                },

                title: { text: undefined },

                xAxis: {
                    categories,
                    tickLength: 0,
                    plotBands,
                    labels: {
                        useHTML: true,
                        formatter: labelFormatter,
                    },
                    gridLineWidth: 1,
                    gridLineColor: "#2C3045",
                    lineColor: "#2C3045",
                    lineWidth: 1,
                },

                yAxis: {
                    min: 0,
                    opposite: true,
                    gridLineWidth: 0,
                    labels: {
                        y: 10,
                        style: { color: "#BABFDA", fontSize: "14px" }
                    },
                    title: {
                        text: ''
                    },
                    max: calculatedMax


                },

                plotOptions: {
                    columnrange: {
                        grouping: false,
                        borderWidth: 0,
                        states: {
                            hover: {
                                brightness: 0.15
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            useHTML: true,
                            formatter() {
                                const point = (this as any).point;
                                if (this.y !== point.high) return "";

                                const p = point.options;
                                const depth = ((p.id ?? '').split("-").length || 0) - 1;
                                return `
                                    <div style="color:#fff;font-size:12px;font-weight:500;white-space:nowrap;display:flex;align-items:center;margin-left:-52px;min-height:35px">
                                    <span style="margin-right:6px;color:#FABBBB;min-width:45px;text-align:right;">
                                        ${p.lossPercent ?? ""}
                                    </span>

                                    <span>${p.valueLabel ?? ""}</span>

                                    ${depth === 1
                                        ? `
                                            <img
                                            src="${EditIcon}"
                                            class="loss-edit-icon"
                                            id="${p.id}"
                                            alt="edit"
                                            style="width:14px;height:14px;cursor:pointer;"
                                            />
                                        `
                                        : ""
                                    }
                                    </div>
                                `;
                            },
                            align: 'left',
                            verticalAlign: 'middle',
                            allowOverlap: true,
                        }
                    }
                },

                series: [
                    {
                        type: "columnrange",
                        data: seriesData,
                        pointWidth: 35,
                    }
                ],

                credits: { enabled: false },
                exporting: { enabled: false },
                tooltip: { enabled: false },
                legend: { enabled: false }
            });
        }
        // ---------------- UPDATE CHART ----------------
        else {
            chartRef.current.update(
                {
                    chart: {
                        events: {
                            render() {
                                bindLabelClicks(this);
                                bindEditIconClicks();
                            }
                        }
                    },
                    xAxis: {
                        categories,
                        plotBands,
                        labels: {
                            useHTML: true,
                            formatter: labelFormatter,
                            x: 0
                        }
                    },
                    plotOptions: {
                        columnrange: {
                            dataLabels: {
                                enabled: true,
                                useHTML: true,
                                formatter() {
                                    const point = (this as any).point;
                                    if (this.y !== point.high) return "";

                                    const p = point.options;
                                    const depth = ((p.id ?? '').split("-").length || 0) - 1;
                                    return `
                                    <div style="color:#fff;font-size:12px;font-weight:500;white-space:nowrap;display:flex;align-items:center;margin-left:-52px;min-height:35px">
                                    <span style="margin-right:6px;color:#FABBBB;min-width:45px;text-align:right;">
                                        ${p.lossPercent ?? ""}
                                    </span>

                                    <span>${p.valueLabel ?? ""}</span>

                                    ${depth === 1
                                            ? `
                                            <img
                                            src="${EditIcon}"
                                            class="loss-edit-icon"
                                            id="${p.id}"
                                            alt="edit"
                                            style="width:14px;height:14px;cursor:pointer;"
                                            />
                                        `
                                            : ""
                                        }
                                    </div>
                                `;
                                },
                                align: 'left',
                                verticalAlign: 'middle',
                                allowOverlap: true,
                            }
                        }
                    },
                    yAxis: {
                        max: calculatedMax
                    },
                    series: [
                        {
                            type: "columnrange",
                            data: seriesData
                        }
                    ]
                },
                true,
                true
            );

            chartRef.current.setSize(
                undefined,
                chartHeight,
                false
            );
        }
    }, [seriesData, chartHeight,]);

    // ---------------- RENDER ----------------
    return (
        <Box
            id="loss-waterfall-container"
            sx={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '400px',
            }}
        >

            <Box sx={{ display: 'flex', gap: 2, padding: '12px' }}>
                {LEGENDS.map(item => (
                    <Box
                        key={item.name}
                        sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                    >
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                bgcolor: item.color,
                                borderRadius: '2px',
                            }}
                        />
                        <Typography color="#E2E4EC">
                            {item.name}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Chart container */}
            <Box sx={{ width: '100%', height: '100%' }}>
                <Box
                    id={"loss-waterfall"}
                    sx={{
                        width: '100%',
                        height: '100%',
                        minHeight: '300px',
                        opacity: 1,
                        transition: 'opacity 0.25s ease'
                    }}
                />
            </Box>
        </Box>
    );
}
