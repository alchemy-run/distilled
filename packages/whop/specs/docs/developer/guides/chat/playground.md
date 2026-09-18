> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Playground

> Interactive playground for embedded chat components

export const Embed = ({url}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const subscribe = React.useCallback(onChange => {
    const observer = new MutationObserver(() => {
      onChange();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  const getSnapshot = React.useCallback(() => {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }, []);
  const getServerSnapshot = React.useCallback(() => {
    return null;
  }, []);
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 250);
    return () => clearTimeout(timeout);
  }, []);
  const iframeSrc = React.useMemo(() => {
    if (!theme) return null;
    const parsed = new URL(url);
    parsed.searchParams.set("pageTheme", theme);
    return parsed.toString();
  }, [url, theme]);
  if (!iframeSrc) return null;
  return <div className="embed-container">
			<iframe src={iframeSrc} className="embed-iframe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.25s ease-in-out"
  }} />
		</div>;
};

<Embed url="https://apollo.elements.whop.com/chat?embedded=1" />
