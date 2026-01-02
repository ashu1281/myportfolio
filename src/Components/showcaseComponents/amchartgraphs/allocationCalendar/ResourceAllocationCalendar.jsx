import React, { useLayoutEffect, useMemo } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { X } from '@mui/icons-material';

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

/* ================= COLORS ================= */

const COLORS = {
  VIOLET: '#6D28D9',
  GREEN: '#22C55E',
  ORANGE: '#FB923C',
  YELLOW: '#FACC15',
  RED: '#EF4444',
  WEEKEND: 'transparent',
  TRANSPARENT: 'rgba(0,0,0,0)',
};

/* ================= CURRENT MONTH DATA ================= */

const generateCalendarData = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const data = [];
  let index = 0;

  // Pad previous month days (to start from Monday)
  const padDays = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < padDays; i++) {
    data.push({
      y: `Week ${Math.floor(index / 7) + 1}`,
      x: weekDays[index % 7],
      value: null,
      avg: 0,
      day: '',
      color: COLORS.TRANSPARENT,
    });
    index++;
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayName = date.toLocaleString('default', { weekday: 'short' });
    const isWeekend = dayName === 'Sat' || dayName === 'Sun';

    const value = isWeekend ? 0 : Math.floor(Math.random() * 1000);
    const avg = value ? Math.min(Math.ceil((value / 1000) * 100), 100) : 0;

    let color = COLORS.RED;
    if (isWeekend) color = COLORS.WEEKEND;
    else if (avg === 100) color = COLORS.VIOLET;
    else if (avg >= 95) color = COLORS.GREEN;
    else if (avg >= 80) color = COLORS.ORANGE;
    else if (avg >= 50) color = COLORS.YELLOW;

    data.push({
      y: `Week ${Math.floor(index / 7) + 1}`,
      x: dayName,
      value,
      avg,
      day,
      color,
      date,
    });

    index++;
  }

  return data;
};

/* ================= COMPONENT ================= */

const ResourceAllocationCalendar = ({ chartId = 'resourceCalendar' }) => {
  const data = useMemo(() => generateCalendarData(), []);

  useLayoutEffect(() => {
    // StrictMode-safe cleanup
    am4core.registry.baseSprites.forEach((sprite) => {
      if (sprite.htmlContainer?.id === chartId) {
        sprite.dispose();
      }
    });

    const chart = am4core.create(chartId, am4charts.XYChart);
    chart.data = data;
    chart.maskBullets = false;
    chart.padding(0, 0, 0, 0);
    chart.contextMenuDisabled = true;

    /* ================= AXES ================= */

    const yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = 'y';
    yAxis.renderer.labels.template.disabled = true;
    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.inversed = true;

    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = 'x';

    xAxis.renderer.opposite = true;
    xAxis.renderer.grid.template.disabled = true;

    // 🔹 Force each category to render
    xAxis.renderer.minGridDistance = 0;
    xAxis.renderer.labels.template.wrap = true;
    xAxis.renderer.labels.template.maxWidth = 50;
    xAxis.renderer.labels.template.truncate = false;

    // 🔹 CRITICAL: disables auto-skipping
    xAxis.renderer.labels.template.adapter.add('visible', () => true);

    xAxis.renderer.labels.template.fill = am4core.color('#FFFFFF');
    xAxis.renderer.labels.template.fontSize = 12;


    /* ================= SERIES ================= */

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = 'x';
    series.dataFields.categoryY = 'y';
    series.dataFields.value = 'value';

    series.columns.template.width = am4core.percent(90);
    series.columns.template.height = am4core.percent(90);
    series.columns.template.stroke = am4core.color('#E0E0E0');
    series.columns.template.strokeWidth = 2;
    series.columns.template.column.cornerRadius(6, 6, 6, 6);

    /* ================= TOOLTIP ================= */

    series.columns.template.adapter.add('tooltipText', (_, target) => {
      const d = target.dataItem?.dataContext;
      if (!d || d.value === null) return '';

      // Format date → "Mon, 18 Sep 2024"
      const formattedDate = d.date
        ? d.date.toLocaleDateString('en-GB', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        : '';

      if (d.color === COLORS.WEEKEND) {
        return (
          `[bold]Weekend[/]\n` +
          `${formattedDate}`
        );
      }

      return (
        `[bold]${d.y}[/]\n` +
        `${formattedDate}\n` +
        `Used Capacity: [bold]${d.value}[/]\n` +
        `Total Available Capacity: [bold]${1000}[/]\n` +
        `Utilization: ${d.avg}%`
      );
    });


    /* ================= COLOR & BACKGROUND ================= */

    series.columns.template.adapter.add('fill', (_, target) => {
      const ctx = target.dataItem?.dataContext;
      return ctx?.value ? am4core.color(ctx.color) : am4core.color(COLORS.TRANSPARENT);
    });

    series.columns.template.adapter.add('strokeOpacity', (_, target) => {
      const ctx = target.dataItem?.dataContext;
      if (!ctx) return 0;

      if (ctx.value > 0 || ctx.color === COLORS.WEEKEND) {
        return 1;
      }
      return 0;
    });


    /* ================= CLICK HANDLER ================= */

    series.columns.template.events.on('hit', (event) => {
      const ctx = event.target.dataItem?.dataContext;
      if (ctx?.value > 0) {
        console.log('Day clicked:', ctx.date);
      }
    });

    series.columns.template.events.on('over', (event) => {
      const ctx = event.target.dataItem?.dataContext;
      event.target.cursorOverStyle =
        ctx?.value ? am4core.MouseCursorStyle.pointer : am4core.MouseCursorStyle.default;
    });


    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';
    chart.legend.align = 'center';
    chart.legend.contentAlign = 'center';
    chart.legend.fontSize = 12;
    chart.legend.labels.template.fill = am4core.color('#FFFFFF');
    chart.legend.marginBottom = 10;
    chart.legend.useDefaultMarker = true;

    // Make legend items clickable=false (calendar legend)
    chart.legend.itemContainers.template.clickable = false;
    chart.legend.itemContainers.template.focusable = false;
    chart.legend.itemContainers.template.cursorOverStyle =
      am4core.MouseCursorStyle.default;
    chart.legend.data = [
      {
        name: '100% Utilization',
        fill: am4core.color(COLORS.VIOLET),
      },
      {
        name: '≥ 95%',
        fill: am4core.color(COLORS.GREEN),
      },
      {
        name: '≥ 80%',
        fill: am4core.color(COLORS.ORANGE),
      },
      {
        name: '≥ 50%',
        fill: am4core.color(COLORS.YELLOW),
      },
      {
        name: 'Low Utilization',
        fill: am4core.color(COLORS.RED),
      },
      {
        name: 'Weekend',
        fill: am4core.color(COLORS.WEEKEND),
      },
    ];
    chart.paddingTop = 15;

    chart.legend.markers.template.width = 14;
    chart.legend.markers.template.height = 14;
    chart.legend.markers.template.strokeOpacity = 0;

    /* ================= VALUE BULLET ================= */
    let bullet = series.bullets.push(new am4charts.Bullet());
    let square = bullet.createChild(am4core.RoundedRectangle);
    square.width = 20;
    square.height = 20;
    square.horizontalCenter = 'middle';
    square.verticalCenter = 'middle';
    square.cornerRadius(0, 3, 3, 0);
    bullet.locationY = 0.92;
    bullet.locationX = 0.96;
    bullet.dy = 9;
    bullet.dx = -11;
    bullet.adapter.add('strokeWidth', (strokeWidth, target) => {
      if (target.dataItem && target.dataItem.dataContext) {
        let dataContext = target.dataItem.dataContext;
        let value = dataContext.value;
        if (value !== null) {
          return 2;
        }
      }
      return 0;
    });
    square.zIndex = 1;
    bullet.fill = am4core.color('#151725');
    square.stroke = am4core.color('#E0E0E0');
    square.strokeOpacity = 0.5;

    let bullet2 = series.bullets.push(new am4charts.LabelBullet());
    bullet2.label.fill = am4core.color('#fff');
    bullet2.label.adapter.add('text', (txt, target) => {
      if (target.dataItem && target.dataItem.dataContext) {
        let dataContext = target.dataItem.dataContext;
        let value = dataContext.value;
        if (value > 0) {
          return '[bold]{value}[/]';
        }
      }
      return '{value}';
    });
    // bullet2.label.text = '[bold]{value}[/]';
    // bullet2.label.fill = am4core.color('#000');
    bullet2.zIndex = 2;
    bullet2.fontSize = 12;
    bullet2.interactionsEnabled = false;

    let bullet3 = series.bullets.push(new am4charts.LabelBullet());
    bullet3.label.text = '{day}';
    bullet3.label.fill = am4core.color('#fff');
    bullet3.label.verticalCenter = 'bottom';
    bullet3.fontSize = 14;
    // bullet3.fontWeight = 'bold';
    bullet3.zIndex = 3;
    bullet3.locationY = 0.75;
    bullet3.locationX = 0.95;
    bullet3.dy = 7;
    bullet3.dx = -10;
    bullet3.interactionsEnabled = false;
    bullet3.label.adapter.add('opacity', (opacity, target) => {
      if (target.dataItem && target.dataItem.dataContext) {
        let dataContext = target.dataItem.dataContext;
        let color = dataContext.color;
        if (color !== '#FFFFFF') {
          return 1;
        }
      }
      return 0;
    });

    return () => {
      chart.dispose();
    };
  }, [chartId, data]);

  return (
    <div
      id={chartId}
      style={{
        width: '100%',
        height: 420,
        background: '#0f1720',
        borderRadius: 12,
      }}
    />
  );
};

export default ResourceAllocationCalendar;
