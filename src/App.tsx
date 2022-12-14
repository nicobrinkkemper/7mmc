import "./App.css";
import About from "About";
import Teaser from "Teaser";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Logo } from "Logo";
import { startDate } from "./useLevelData";
import { Credits } from "./Credits";
import { Level } from "./Level";
import Batches from "./Batches";
import Batch from "./Batch";
import { Seo } from "./Seo";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "./constants";
import NotFound from "./NotFound";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "ErrorFallback";
import { WeekTrailer } from "WeekTrailer";
import { AboutButton } from "AboutButton";
import { BackButton } from "BackButton";
import { WelcomeContent } from "content/WelcomeContent";

const CountdownApp = () => {
  return (<Routes>
    <Route path="/credits" element={<CreditPage />} />
    <Route path="/" element={<CountdownPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>)
}

const MainApp = () => {
  return <Routes>
    <Route path="/level/:batchNumber/:order" element={<LevelPage />} />
    <Route path="/levels/:batchNumber" element={<BatchPage />} />
    <Route path="/levels/:batchNumber" element={<BatchPage />} />
    <Route path="/levels" element={<LevelsPage />} />
    <Route path="/credits" element={<CreditPage />} />
    <Route path="/" element={<HomePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
}

const CreditPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar big">
        <Logo logo="logo_special" />
        <AboutButton />
      </div>
      <BackButton />
    </header>
    <article className="App-body creditsPage">
      <Credits />
    </article>
  </>
);
const CountdownPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar small">
        <Logo small logo="logo" />
        <AboutButton />
      </div>
    </header>
    <article className="App-body countdownPage">
      <Teaser />
    </article>
    <Seo
      description={`${DEFAULT_DESCRIPTION}. We will start ${startDate.toDateString()}`}
      title={`${DEFAULT_TITLE} | We are getting ready`}
    />
  </>
);
const LevelPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar small">
        <Logo small logo="logo" />
        <AboutButton />
      </div>
      <BackButton />
    </header>
    <article className="App-body levelPage">
      <Level />
    </article>
  </>
)
const BatchPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar small">
        <Logo small logo="logo" />
        <AboutButton />
      </div>
      <WeekTrailer />
      <BackButton />
    </header>
    <article className="App-body batchPage">
      <Batch />
    </article>
  </>
)
const LevelsPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar big">
        <Logo logo="logo" />
        <AboutButton />
      </div>
      <BackButton />
    </header>
    <article className="App-body levelsPage">
      <Batches />
    </article>
  </>
)
const HomePage = () => (
  <>
    <header className="App-header">
      <div className="toolbar big">
        <Logo logo="logo_special" />
        <AboutButton />
      </div>
    </header>
    <article className="App-body homePage">
      <WelcomeContent />
      <Seo title={`${DEFAULT_TITLE} | ${DEFAULT_DESCRIPTION}`} />
    </article>
  </>
)
const NotFoundPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar big">
        <Logo />
      </div>
    </header>
    <article className="App-body notFoundPage">
      <NotFound error={"Could not find anything for this URL."} />
    </article>
  </>
)
const App = () => {
  const location = useLocation();
  const showAbout = location.hash === "#!/about";
  const TeaserOrMain = startDate.getTime() >= Date.now() ? <CountdownApp /> : <MainApp />
  const style = showAbout ? { overflowY: "hidden", maxHeight: "100vh" } as const : {};
  return (
    <div
      className="App"
      style={style}
    >
      <div className="ie-fixMinHeight">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          {TeaserOrMain}
          <About />
          <footer className="App-footer">
            <a
              href="https://discord.gg/8mnW3XfZq9"
              rel="noopener noreferrer"
              target="_BLANK"
            >
              Discord
            </a>
            <a
              href="https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ"
              rel="noopener noreferrer"
              target="_BLANK"
            >
              Youtube
            </a>
            <Link to="/credits/">Credits</Link>
          </footer>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;

export { App };
