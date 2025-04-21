import { useEffect, useState } from 'react';

import styles from './DecentBar.module.css';
import ContentButton from '@/components/contentButton/ContentButton';
import { getBaseUrl, isServingFromEnabledDomain } from './decentBarUtil';

// Default domains where the decent bar is rendered. Can be overridden in props.
const DEFAULT_ENABLED_DOMAINS = ['decentapps.net', '127.0.0.1', 'localhost'];

export type Link = {
  description:string,
  url:string
}

type Props = {
  appName:string,
  appLinks?:Link[],
  contributorText?:string,
  enabledDomains?:string[],
  homeUrl?:string,
  onClickLink?:(link:Link) => void
}

function _onClickLink(link:Link) {
  if (link.url.startsWith('http')) {
    window.open(link.url, '_blank');
  } else {
    console.error('Link URL does not start with "http"--navigation canceled.', link.url);
  }
}

function _findFavIconLink() {
  return document.querySelector<HTMLLinkElement>('link[rel~="icon"][sizes="192x192"]') ||
    document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
}

function _appLinksContent(links:Link[], onClickLink:Function) {
  if (!links.length) return <>&nbsp;</>; // Returning something keeps the layout from breaking or needing more complexity to handle empty links.
  const linkButtons = links.map((link, buttonNo) => {
    return (
      <ContentButton key={buttonNo} text={link.description} onClick={() => {onClickLink(link)}}/>
     ); 
  });
  return <>Links:<br />{linkButtons}</>;
}

function DecentBar({ appName, appLinks, contributorText, onClickLink = _onClickLink, enabledDomains = DEFAULT_ENABLED_DOMAINS, homeUrl = getBaseUrl() }: Props) {
  const [favIconUrl, setFavIconUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isServingFromEnabledDomain(enabledDomains)) {
      console.log('DecentBar did not render because the current domain is not in the enabled domains list.'); // This is sometimes what the developer wants.
      return;
    }
    const link = _findFavIconLink();
    if (!link) { console.error('DecentBar did not render because no favicon image was set.'); return; }
    setFavIconUrl(link.href);
  }, []);

  if (!favIconUrl) return null; // First render, no favicon is found, or not serving from an enabled domain.

  const appLinksContent = _appLinksContent(appLinks || [], onClickLink);

  return (
    <div className={styles.container}>
      <div className={styles.decentFacet}>
        <a href={homeUrl}>
          <img src={favIconUrl} className={styles.favIcon} draggable="false"/>
        </a>  
      </div>
      <div className={styles.appFacet}>
        <div className={styles.appName}>{appName}</div>
        <div className={styles.appButtonArea}>
          {appLinksContent}
        </div>
      </div>
      <div className={styles.appFacetSeparator} />
      <div className={styles.contributorFacet}>
        {contributorText}
      </div>
    </div>
  )
}

export default DecentBar;