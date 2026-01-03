import { useState } from "react";
import { APIResponse } from "./LinkPreviewContainer";
import LinkPreviewNotAvlIcon from '../../../Images/pojectImages/showCaseImages/linkPreviewNotAvlIcon.svg'
interface SecureLinkPreviewComponentProps {
  url: string;
  data: APIResponse | null;
  showPreviewNotAvlUI?:boolean;
}
const LinkPreviewError = () => {
    return (
      <div
        style={{
          backgroundColor: '#D7D7D7',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          fontSize: '14px',
          fontWeight: 400,
          height:'160px',
          padding:'16px'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src={LinkPreviewNotAvlIcon}
          alt="Link preview not available"
          style={{ fontSize: '24px', width: '24px', height: '24px'}}
        />{/*
        */}Preview not available. Please make sure the link is valid.
      </span>
      </div>
    );
  };


const SecureLinkPreviewComponent: React.FC<SecureLinkPreviewComponentProps> = ({ url,data, showPreviewNotAvlUI = false }) => {
  const isSecureLink = data && data.title === null && data.image !== null && data.image !== '' && data.hostname !== null && data.hostname !== '';
  const [imageError, setImageError] = useState(false);
  const hostname = data?.hostname ?? "";
  const favicon = data?.image ?? `https://${hostname}/favicon.ico`;

  if (!isSecureLink) return showPreviewNotAvlUI ? <LinkPreviewError/> : null;
  if (imageError && showPreviewNotAvlUI) return <LinkPreviewError />;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#453e59',
      borderRadius: '12px',
      padding: '12px 16px',
      maxWidth: '100%',
      marginTop:'10px',
      color:'white'
    }}>
        <img
          src={favicon}
          alt="site logo"
          style={{
            width: '48px',
            height: '48px',
            marginRight: '16px',
            borderRadius: '8px',
            backgroundColor: 'white',
            objectFit: 'contain'
          }}
          onError={() => setImageError(true)}
        />
      <div style={{display:'flex', position:'relative', flexDirection:'column', maxWidth:'calc(100% - 70px)'}}>
      <style>
        {`
          .custom-link {
            color: white;
            text-decoration: underline !important;
            font-size: 14px;
            line-height: 16px;
          }
          .text-dec{
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        `}
      </style>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="custom-link text-dec"
        >
          {url}
        </a>
        {data?.description && <span title={data?.description} style={{ fontSize: '14px',opacity: 0.9, color: '#fff', marginTop:'4px'}} className="text-dec">
          {data.description}
        </span>}
        <div style={{ color:'white',fontSize: '12px', opacity: 0.9, marginTop:'4px' }} 
          className="text-dec"
          >{hostname}</div>
      </div>
    </div>
  );
};
export default SecureLinkPreviewComponent;