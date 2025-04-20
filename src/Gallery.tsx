import DecentBar, { Link } from './components/decentBar/DecentBar';
import style from './Gallery.module.css'

function testMinimal() {
  return <>
    <h3>Test: Minimal DecentBar</h3>
    <DecentBar appName="My App" onClickLink={() => {}}/>
  </>;
}

function testShortAppName() {
  return <>
    <h3>Test: Displays Short App Name</h3>
    <DecentBar appName="." onClickLink={() => {}}/>
  </>;
}

function testLongAppName() {
  return <>
    <h3>Test: Displays Long App Name</h3>
    <DecentBar appName="Such a Lengthy App Name" onClickLink={() => {}}/>
  </>;
}

function testLongAppNameWithNoSpaces() {
  return <>
    <h3>Test: Displays Long App Name with No Spaces</h3>
    <DecentBar appName="SuchALengthyAppName" onClickLink={() => {}}/>
  </>;
}

function testLinks() {
  const links = [
    { description: 'Link 1', url: 'https://example.com/1' },
    { description: 'Link 2', url: 'another link' }
  ];
  function _onClickLink(link:Link) {
    console.log('Clicked link:', link);
  }

  return <>
    <h3>Test: Has Clickable Links</h3>
    <DecentBar appName="My App" appLinks={links} onClickLink={_onClickLink}/>
  </>;
}

function testNoRenderOnDisabledDomain() {
  return <>
    <h3>Test: Does Not Render if Not Matching Domain</h3>
    <DecentBar appName="My App" onClickLink={() => {}} enabledDomains={[]}/>
    <p>If you don't see a DecentBar just above this line, the test passed.</p>
  </>;
}

function testContributors() {
  return <>
    <h3>Test: Shows Contributors</h3>
    <DecentBar
      appName="My App"
      contributorText="John Doe, Jane Smith"
      onClickLink={() => {}}
    />
  </>;
}

function testOverrideHomeUrl() {
  return <>
    <h3>Test: Override Home URL</h3>
    <DecentBar
      appName="My App"
      homeUrl="https://decentapps.net/info/tags/blog/"
      onClickLink={() => {}}
    />
  </>;
}

function Gallery() {
  return (
    <div className={style.container}>
      <h1>Decent Portal Test App</h1>

      <h2>DecentBar Tests</h2>
      { testMinimal() }
      { testShortAppName() }
      { testLongAppName() }
      { testLongAppNameWithNoSpaces() }
      { testLinks() }
      { testContributors() }
      { testNoRenderOnDisabledDomain() }
      { testOverrideHomeUrl() }
    </div>
  );
}

export default Gallery;
