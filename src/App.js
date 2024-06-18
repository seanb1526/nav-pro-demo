import './App.css';
import './Navbar.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>IndoorNav Pro Prototype</h1>
        <p>This is an example of a simple map app we can build for your event</p>
      </header>
      <body className="App-body">
        <p>Below is an example of one of our Pro maps, the tier above our basic map.</p>
        <p>It features locations, points of interest, wayfinding/directions, colors, images, and descriptions. </p>
        <p>Our Basic tier has locations and wayfinding, but does not include the customization features of images, colors, and points of interest.</p>
        <iframe
          title="map"
          id="myFrame"
          href="https://www.mappedin.com/"
          width="80%"
          height="600"
          src="https://app.mappedin.com/map/663e34658004177ee42bce3b?floor=m_f61d50016e33e723&utm_medium=email&_hsenc=p2ANqtz-_Jk3Dwc0xMPRhPeOP2X_n9RTqQl771BP6cPGqE-fkixvzKYh4XpASZi5FEiXYCdg-THdtogx3OHYyqkUKFonMPcKtBvFAejY53VIfIUMFqHIaQUl0&_hsmi=310348920&utm_content=310348920&utm_source=hs_email"
          
        ></iframe>
      </body>
    </div>
  );
}

export default App;
