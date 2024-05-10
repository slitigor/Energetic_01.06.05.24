import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="flex flex-col gap-4 px-8 py-4">
        <Header />
        <MainContent />
        <Separator />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
