import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="py-2 px-6">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
