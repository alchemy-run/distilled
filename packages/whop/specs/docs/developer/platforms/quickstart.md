> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> Embed payout components in your application in minutes

export const code = {
  backend: {
    nextjs: [{
      code: `import type { NextRequest } from "next/server";

// [step:1.1:start]
import { WhopClient } from "@whop/sdk";

const whop = new WhopClient({
	token: process.env.WHOP_API_KEY,
});
// [step:1.1:end]

export async function GET(request: NextRequest) {
	const accountId = request.nextUrl.searchParams.get("accountId");

	if (!accountId) {
		return new Response(null, { status: 400 });
	}

	// [step:1.2:start]
	const tokenResponse = await whop.accessTokens.create({
		company_id: accountId,
	});
	// [step:1.2:end]

	return Response.json({ token: tokenResponse.token });
}
`,
      filename: "route.ts",
      language: "typescript"
    }],
    express: [{
      code: `// [step:1.1]
import { WhopClient } from "@whop/sdk";
import express from "express";

const app = express();
app.use(express.json());

// [step:1.1:start]
const whop = new WhopClient({
	token: process.env.WHOP_API_KEY,
});
// [step:1.1:end]

app.get("/api/token", async (req, res) => {
	const accountId = req.query.accountId;

	if (!accountId) {
		return res.status(400).json({ error: "accountId is required" });
	}

	// [step:1.2:start]
	const tokenResponse = await whop.accessTokens.create({
		company_id: accountId,
	});
	// [step:1.2:end]

	res.json({ token: tokenResponse.token });
});

app.listen(3000, () => console.log("Server running on port 3000"));
`,
      filename: "server.ts",
      language: "typescript"
    }],
    python: [{
      code: `# [step:1.1]
from whop_sdk import Whop
from flask import Flask, request, jsonify

app = Flask(__name__)
# [step:1.1]
client = Whop(api_key="Account API Key")

@app.route('/api/access-token', methods=['POST'])
def create_access_token():
    data = request.get_json()
    account_id = data.get('accountId')

    # [step:1.2:start]
    access_token = client.access_tokens.create(
        company_id=account_id
    )
    # [step:1.2:end]

    return jsonify({'token': access_token.token})
`,
      filename: "server.py",
      language: "python"
    }]
  },
  frontend: {
    react: [{
      code: `// [step:2.1:start]
import {
	BalanceElement,
	Elements,
	PayoutsSession,
	WithdrawButtonElement,
	WithdrawalsElement,
} from "@whop/embedded-components-react-js";
import { loadWhopElements } from "@whop/embedded-components-vanilla-js";
// [step:2.1:end]

const elements = loadWhopElements();

export function PayoutPortal({ accountId }: { accountId: string }) {
	return (
		// [step:2.2:start]
		<Elements elements={elements}>
			<PayoutsSession
				token={() =>
					fetch(\`/api/token?accountId=\${accountId}\`)
						.then((res) => res.json())
						.then((data) => data.token)
				}
				companyId={accountId}
				redirectUrl="https://yourapp.com/verification-complete"
			>
				{/* [step:2.2:end] */}
				{/* [step:2.3] */}
				<BalanceElement fallback={<div>Loading...</div>} />
				{/* [step:2.4] */}
				<WithdrawButtonElement fallback={<div>Loading...</div>} />
				{/* [step:2.5] */}
				<WithdrawalsElement fallback={<div>Loading...</div>} />
			</PayoutsSession>
		</Elements>
	);
}
`,
      filename: "PayoutPortal.tsx",
      language: "tsx"
    }],
    html: [{
      code: `<!DOCTYPE html>
<html>
  <head>
  <!-- [step:2.1] -->
    <script src="https://latest.elements.whop.com/release/elements.js"></script>
  </head>
  <body>
    <div id="balance"></div>
    <div id="withdraw-button"></div>
    <div id="withdrawals"></div>

    <script>
      // [step:2.1]
      const elements = window.WhopElements.loadWhopElements();

      // [step:2.2:start]
      elements.createPayoutsSession({
        token: async () => {
          const res = await fetch('/api/token?accountId=YOUR_ACCOUNT_ID');
          const data = await res.json();
          return data.token;
        },
        companyId: 'YOUR_ACCOUNT_ID',
        redirectUrl: 'https://yourapp.com/verification-complete'
      });
      // [step:2.2:end]

      // [step:2.3]
      elements.create('balance').mount('#balance');
      // [step:2.4]
      elements.create('withdrawButton').mount('#withdraw-button');
      // [step:2.5]
      elements.create('withdrawals').mount('#withdrawals');
    </script>
  </body>
</html>
`,
      filename: "index.html",
      language: "html"
    }]
  }
};

export const QuickStart = ({children, code, steps, title, description, platformGroups, conditionalCategories}) => {
  const CATEGORY_CONFIG = {
    frontend: {
      label: "Client",
      languages: {
        react: {
          label: "React"
        },
        html: {
          label: "HTML"
        }
      }
    },
    client: {
      label: "Client",
      languages: {
        react: {
          label: "React"
        },
        html: {
          label: "Vanilla"
        },
        swift: {
          label: "Swift"
        }
      }
    },
    backend: {
      label: "Server",
      languages: {
        express: {
          label: "Express"
        },
        nextjs: {
          label: "Next.js"
        },
        python: {
          label: "Python"
        },
        ruby: {
          label: "Ruby"
        },
        go: {
          label: "Go"
        }
      }
    },
    auth: {
      label: "Auth",
      languages: {
        token: {
          label: "Token"
        },
        "better-auth": {
          label: "Better Auth"
        },
        authjs: {
          label: "Auth.js"
        }
      }
    }
  };
  const allCategories = Object.keys(code);
  const [activePlatformGroupId, setActivePlatformGroupId] = React.useState(() => platformGroups?.[0]?.id ?? null);
  const [selectedLanguages, setSelectedLanguages] = React.useState(() => Object.entries(code).reduce((acc, [category, languages]) => {
    acc[category] = Object.keys(languages)[0];
    return acc;
  }, {}));
  const activePlatformGroup = platformGroups?.find(g => g.id === activePlatformGroupId);
  const conditionalCatNames = new Set(conditionalCategories ? Object.keys(conditionalCategories) : []);
  const platformCategories = activePlatformGroup ? allCategories.filter(c => activePlatformGroup.categories.includes(c)) : allCategories.filter(c => !conditionalCatNames.has(c));
  const activeConditionalCats = [];
  const hiddenByConditional = new Set();
  if (conditionalCategories) {
    const matchesShowWhen = cond => Object.entries(cond).every(([key, value]) => {
      if (!allCategories.includes(key)) return false;
      if (Array.isArray(value)) return value.includes(selectedLanguages[key]);
      return selectedLanguages[key] === value;
    });
    for (const [cat, config] of Object.entries(conditionalCategories)) {
      if (!allCategories.includes(cat)) continue;
      const isActive = Array.isArray(config.showWhen) ? config.showWhen.some(matchesShowWhen) : matchesShowWhen(config.showWhen);
      if (isActive) {
        activeConditionalCats.push(cat);
        for (const hidden of config.hides || []) {
          hiddenByConditional.add(hidden);
        }
      }
    }
  }
  const selectorCategories = [...platformCategories, ...activeConditionalCats];
  const matchableCategories = [...new Set([...selectorCategories, ...hiddenByConditional])];
  const fileCategories = selectorCategories.filter(c => !hiddenByConditional.has(c));
  const categories = fileCategories;
  const [selectedFileIndex, setSelectedFileIndex] = React.useState(0);
  const [activeSubStepKey, setActiveSubStepKey] = React.useState(null);
  const [isCodeContentHovered, setIsCodeContentHovered] = React.useState(false);
  const subStepRefs = React.useRef({});
  const stepsContainerRef = React.useRef(null);
  const codePanelRef = React.useRef(null);
  const lastAutoSwitchedStep = React.useRef(null);
  const isClickScrolling = React.useRef(false);
  React.useEffect(() => {
    const container = stepsContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      const scrollTop = container.scrollTop;
      let newActiveKey = null;
      const keys = Object.keys(subStepRefs.current).sort((a, b) => {
        const [aStep, aSub] = a.split("-").map(Number);
        const [bStep, bSub] = b.split("-").map(Number);
        return aStep - bStep || aSub - bSub;
      });
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const el = subStepRefs.current[key];
        if (!el) continue;
        const elTop = el.offsetTop - container.offsetTop;
        const elHeight = el.offsetHeight;
        const scrollPastThreshold = elHeight * 0.15;
        if (scrollTop < elTop + scrollPastThreshold) {
          newActiveKey = key;
          break;
        }
      }
      setActiveSubStepKey(newActiveKey);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [steps]);
  const handlePlatformGroupSelect = groupId => {
    setActivePlatformGroupId(groupId);
    setSelectedFileIndex(0);
    lastAutoSwitchedStep.current = null;
  };
  const handleLanguageSelect = (category, language) => {
    setSelectedLanguages(prev => ({
      ...prev,
      [category]: language
    }));
    lastAutoSwitchedStep.current = null;
  };
  const getFiles = (category, language) => {
    const langCode = code[category]?.[language];
    if (!langCode) return [];
    return Array.isArray(langCode) ? langCode : [langCode];
  };
  const allFiles = (() => {
    const raw = categories.flatMap(category => {
      const language = selectedLanguages[category];
      return getFiles(category, language).filter(file => {
        if (!file.conditions) return true;
        return file.conditions.every(c => {
          if (Array.isArray(c.value)) {
            return c.value.includes(selectedLanguages[c.category]);
          }
          return selectedLanguages[c.category] === c.value;
        });
      }).map(file => ({
        ...file,
        category
      }));
    });
    if (activeConditionalCats.length === 0) return raw;
    const result = [];
    const seen = new Set();
    for (let i = raw.length - 1; i >= 0; i--) {
      if (!seen.has(raw[i].filename)) {
        seen.add(raw[i].filename);
        result.unshift(raw[i]);
      }
    }
    return result;
  })();
  React.useEffect(() => {
    if (selectedFileIndex >= allFiles.length) {
      setSelectedFileIndex(0);
    }
  }, [allFiles.length]);
  const processedFiles = allFiles.map(file => {
    const code = file.code;
    const lines = code.split("\n");
    let lineOffset = 0;
    const markers = [];
    let openMarkers = [];
    const filteredLines = [];
    const singleLinePattern = /(?:\/\/|#|\/\*|<!--)\s*\[step:(\d+\.\d+)\]\s*(?:\*\/|-->)?/;
    const multiLineStartPattern = /(?:\/\/|#|\/\*|<!--)\s*\[step:(\d+\.\d+):start\]\s*(?:\*\/|-->)?/;
    const multiLineEndPattern = /(?:\/\/|#|\/\*|<!--)\s*\[step:(\d+\.\d+):end\]\s*(?:\*\/|-->)?/;
    for (const lineIdx in lines) {
      const line = lines[lineIdx];
      const matchesSingleLine = line.match(singleLinePattern);
      if (matchesSingleLine) {
        const currentLine = parseInt(lineIdx) - lineOffset + 1;
        markers.push({
          step: matchesSingleLine[1],
          range: [currentLine, currentLine]
        });
        lineOffset += 1;
        continue;
      }
      const matchesMultiLineStart = line.match(multiLineStartPattern);
      if (matchesMultiLineStart) {
        openMarkers.push({
          step: matchesMultiLineStart[1],
          start: parseInt(lineIdx) - lineOffset + 1
        });
        lineOffset += 1;
        continue;
      }
      const matchesMultiLineEnd = line.match(multiLineEndPattern);
      if (matchesMultiLineEnd) {
        const start = [...openMarkers].reverse().find(marker => marker.step === matchesMultiLineEnd[1]);
        if (start) {
          openMarkers = openMarkers.filter(marker => marker !== start);
          markers.push({
            step: matchesMultiLineEnd[1],
            range: [start.start, parseInt(lineIdx) - lineOffset]
          });
          lineOffset += 1;
          continue;
        }
      }
      filteredLines.push(line);
    }
    return {
      ...file,
      code: filteredLines.join("\n"),
      markers
    };
  });
  const getActiveStepMarkerId = () => {
    if (!activeSubStepKey) return null;
    const [stepIdx, subStepIdx] = activeSubStepKey.split("-").map(Number);
    return `${stepIdx + 1}.${subStepIdx + 1}`;
  };
  React.useEffect(() => {
    if (!activeSubStepKey || lastAutoSwitchedStep.current === activeSubStepKey) return;
    const stepMarkerId = getActiveStepMarkerId();
    if (!stepMarkerId) return;
    const fileIndex = processedFiles.findIndex(file => file.markers.some(m => m.step === stepMarkerId));
    if (fileIndex !== -1) {
      lastAutoSwitchedStep.current = activeSubStepKey;
      setSelectedFileIndex(fileIndex);
    }
  }, [activeSubStepKey, selectedLanguages]);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const container = codePanelRef.current?.querySelector('[data-component-part="code-block-root"]');
      const highlightedLine = container?.querySelector(".line-highlight, .line-focus");
      if (container && highlightedLine) {
        const lineTop = highlightedLine.offsetTop;
        const containerHeight = container.clientHeight;
        const lineHeight = highlightedLine.offsetHeight;
        container.scrollTo({
          top: lineTop - containerHeight / 2 + lineHeight / 2,
          behavior: "smooth"
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [activeSubStepKey, selectedFileIndex]);
  const currentFile = processedFiles[selectedFileIndex] || processedFiles[0];
  const getHighlightLines = () => {
    if (!currentFile || !activeSubStepKey) return null;
    const stepMarkerId = getActiveStepMarkerId();
    const stepMarkers = currentFile.markers.filter(m => m.step === stepMarkerId);
    if (stepMarkers.length === 0) return null;
    const lines = [];
    for (const marker of stepMarkers) {
      for (let i = marker.range[0]; i <= marker.range[1]; i++) {
        lines.push(i);
      }
    }
    return JSON.stringify(lines);
  };
  const highlightLines = getHighlightLines();
  const focusLines = isCodeContentHovered ? null : highlightLines;
  return <div className="qs-container" id="quickstart-content">
			<div className="qs-top-bar">
				{platformGroups && <div className="qs-selector-group">
						<span className="qs-selector-label">Platform</span>
						<div className="qs-selector-buttons">
							{platformGroups.map(group => <button key={group.id} onClick={() => handlePlatformGroupSelect(group.id)} className={`qs-selector-button ${activePlatformGroupId === group.id ? "qs-selector-button-active" : ""}`} aria-pressed={activePlatformGroupId === group.id}>
									{group.label}
								</button>)}
						</div>
						<select className="qs-selector-select" value={activePlatformGroupId} onChange={e => handlePlatformGroupSelect(e.target.value)}>
							{platformGroups.map(group => <option key={group.id} value={group.id}>
									{group.label}
								</option>)}
						</select>
					</div>}
				{selectorCategories.map(category => {
    const config = CATEGORY_CONFIG[category] || ({
      label: category,
      languages: {}
    });
    const languages = code[category];
    const languageKeys = Object.keys(languages);
    const selectedLanguage = selectedLanguages[category];
    if (languageKeys.length <= 1) return null;
    return <div key={category} className="qs-selector-group">
							<span className="qs-selector-label">{config.label}</span>
							<div className="qs-selector-buttons">
								{languageKeys.map(language => {
      const langConfig = config.languages[language] || ({
        label: language
      });
      const isSelected = selectedLanguage === language;
      return <button key={language} onClick={() => handleLanguageSelect(category, language)} className={`qs-selector-button ${isSelected ? "qs-selector-button-active" : ""}`} aria-pressed={isSelected}>
											{langConfig.label}
										</button>;
    })}
							</div>
							<select className="qs-selector-select" value={selectedLanguage} onChange={e => handleLanguageSelect(category, e.target.value)}>
								{languageKeys.map(language => {
      const langConfig = config.languages[language] || ({
        label: language
      });
      return <option key={language} value={language}>
											{langConfig.label}
										</option>;
    })}
							</select>
						</div>;
  })}
			</div>
			<div className="qs-steps" ref={stepsContainerRef}>
				<div className="px-6 py-2 flex flex-col gap-1">
					<h1 className="m-0 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight dark:text-gray-200">
						{title}
					</h1>
					{description}
				</div>
				{(() => {
    let stepNumber = 0;
    return steps.map((step, idx) => {
      const resolvedSubSteps = step.subSteps.map(subStep => {
        if (!Array.isArray(subStep)) return subStep;
        return subStep.find(s => Object.entries(s.match).every(([key, value]) => matchableCategories.includes(key) && (Array.isArray(value) ? value.includes(selectedLanguages[key]) : selectedLanguages[key] === value)));
      }).filter(Boolean);
      if (resolvedSubSteps.length === 0) return null;
      stepNumber++;
      const displayNumber = stepNumber;
      return <div key={idx} className="qs-step-group">
								<div className="qs-step-header">
									<span className="qs-step-indicator">{displayNumber}</span>
									<h3>{step.title}</h3>
								</div>
								<div>
									{step.subSteps.map((subStep, subIdx) => {
        const subStepKey = `${idx}-${subIdx}`;
        const isSubStepActive = activeSubStepKey === subStepKey;
        const resolvedSubStep = Array.isArray(subStep) ? subStep.find(s => Object.entries(s.match).every(([key, value]) => matchableCategories.includes(key) && (Array.isArray(value) ? value.includes(selectedLanguages[key]) : selectedLanguages[key] === value))) : subStep;
        if (!resolvedSubStep) return null;
        const handleStepClick = () => {
          if (isSubStepActive) return;
          setActiveSubStepKey(subStepKey);
          isClickScrolling.current = true;
          const el = subStepRefs.current[subStepKey];
          const container = stepsContainerRef.current;
          if (el && container) {
            const elTop = el.offsetTop - container.offsetTop;
            container.scrollTo({
              top: elTop,
              behavior: "smooth"
            });
          }
          setTimeout(() => {
            isClickScrolling.current = false;
          }, 500);
        };
        return <div className={`qs-step ${isSubStepActive ? "qs-step-active" : ""}`} key={subIdx} ref={el => subStepRefs.current[subStepKey] = el} onClick={handleStepClick} style={{
          cursor: isSubStepActive ? "default" : "pointer"
        }}>
												<h4 className="mb-2">{resolvedSubStep.title}</h4>
												<div className="qs-step-content">
													{resolvedSubStep.content}
												</div>
											</div>;
      })}
								</div>
							</div>;
    });
  })()}
				<div className="px-6 pb-6 ml-1">{children}</div>
			</div>
			<div className="qs-code-panel" ref={codePanelRef}>
				<div className="qs-code-header">
					{allFiles.length > 1 ? <div className="qs-file-tabs">
							{allFiles.map((file, index) => <button key={`${file.category}-${file.language}-${file.filename}`} onClick={() => setSelectedFileIndex(index)} className={`qs-file-tab ${index === selectedFileIndex ? "qs-file-tab-active" : ""}`}>
									{file.filename}
								</button>)}
						</div> : <span className="qs-code-filename">
							{currentFile?.filename || "No files"}
						</span>}
				</div>
				<div className="qs-code-content" onMouseEnter={() => setIsCodeContentHovered(true)} onMouseLeave={() => setIsCodeContentHovered(false)}>
					{currentFile ? <CodeBlock lines={true} language={currentFile.language} focus={focusLines} highlight={highlightLines}>
							{currentFile.code}
						</CodeBlock> : "Select a language"}
				</div>
			</div>
		</div>;
};

export const ExamplesLink = ({href}) => <a href={href} className="examples-link">
		<div className="examples-link__row">
			<span className="examples-link__title">✨ Build this with AI</span>
			<span className="examples-link__jump">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
			</span>
		</div>
		<p className="examples-link__description">
			Copy and paste our templates using your favorite editor
		</p>
		<div className="examples-link__icons">
			<span className="examples-link__icon" title="Claude">
				<svg viewBox="0 0 24 24">
					<path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" fillRule="nonzero" />
				</svg>
			</span>
			<span className="examples-link__icon" title="Cursor">
				<svg viewBox="85 69 343 354" fill="currentColor">
					<path d="M255.428 423l148.991-83.5L255.428 256l-148.99 83.5 148.99 83.5z" fillOpacity=".7" />
					<path d="M404.419 339.5v-167L255.428 89v167l148.991 83.5z" fillOpacity=".5" />
					<path d="M255.428 89l-148.99 83.5v167l148.99-83.5V89z" fillOpacity=".6" />
					<path d="M404.419 172.5L255.428 423V256l148.991-83.5z" fillOpacity=".9" />
					<path d="M404.419 172.5L255.428 256l-148.99-83.5h297.981z" />
				</svg>
			</span>
			<span className="examples-link__icon" title="Codex">
				<svg viewBox="0 0 24 24" fill="#10a37f">
					<path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
				</svg>
			</span>
			<span className="examples-link__icon" title="Lovable">
				<svg viewBox="0 0 24 24">
					<path clipRule="evenodd" d="M7.082 0c3.91 0 7.081 3.179 7.081 7.1v2.7h2.357c3.91 0 7.082 3.178 7.082 7.1 0 3.923-3.17 7.1-7.082 7.1H0V7.1C0 3.18 3.17 0 7.082 0z" fill="url(#lovable-grad)" fillRule="evenodd" />
					<defs>
						<radialGradient cx="0" cy="0" gradientTransform="matrix(-1 22.5 -30.454 -1.354 14 3)" gradientUnits="userSpaceOnUse" id="lovable-grad" r="1">
							<stop offset=".25" stopColor="#FE7B02" />
							<stop offset=".433" stopColor="#FE4230" />
							<stop offset=".548" stopColor="#FE529A" />
							<stop offset=".654" stopColor="#DD67EE" />
							<stop offset=".95" stopColor="#4B73FF" />
						</radialGradient>
					</defs>
				</svg>
			</span>
			<span className="examples-link__more">+ more</span>
		</div>
	</a>;

<QuickStart
  code={code}
  steps={[{
title: "Set up your server",
subSteps: [[
  {
    match: { backend: "express" },
    title: "Install the Whop SDK",
    content: <>
      Install the Whop SDK and initialize the client with your API key.

      <CodeGroup>
        <CodeBlock language="bash" filename="npm">
          npm install @whop/sdk express
        </CodeBlock>
        <CodeBlock language="bash" filename="pnpm">
          pnpm add @whop/sdk express
        </CodeBlock>
        <CodeBlock language="bash" filename="yarn">
          yarn add @whop/sdk express
        </CodeBlock>
      </CodeGroup>
    </>
  }, {
    match: { backend: "nextjs" },
    title: "Install the Whop SDK",
    content: <>
      Install the Whop SDK and initialize the client with your API key.

      <CodeGroup>
        <CodeBlock language="bash" filename="npm">
          npm install @whop/sdk
        </CodeBlock>
        <CodeBlock language="bash" filename="pnpm">
          pnpm add @whop/sdk
        </CodeBlock>
        <CodeBlock language="bash" filename="yarn">
          yarn add @whop/sdk
        </CodeBlock>
      </CodeGroup>
    </>
  }, {
    match: { backend: "python" },
    title: "Install the Whop SDK",
    content: <>
      Install the Whop SDK and initialize the client with your API key.

      <CodeGroup>
        <CodeBlock language="bash" filename="pip">
          pip install whop-sdk
        </CodeBlock>
        <CodeBlock language="bash" filename="poetry">
          poetry add whop-sdk
        </CodeBlock>
      </CodeGroup>
    </>
  }
], {
  title: "Create an access token endpoint",
  content: <>
    <p>Create an API endpoint that generates access tokens for your connected accounts. This token grants temporary access to the payout portal.</p>
    <p>The endpoint should:</p>
    <ul>
      <li>Authenticate the user making the request</li>
      <li>Accept an <code>accountId</code> parameter</li>
      <li>Return a temporary access token</li>
    </ul>
  </>
}]

}, {
title: "Build a payouts portal on the client",
subSteps: [[
{
match: { frontend: "react" },
title: "Install the embedded components",
content: <>
Install the Whop embedded components packages for React.

      <CodeGroup>
        <CodeBlock language="bash" filename="npm">
          npm install @whop/embedded-components-react-js @whop/embedded-components-vanilla-js
        </CodeBlock>
        <CodeBlock language="bash" filename="pnpm">
          pnpm add @whop/embedded-components-react-js @whop/embedded-components-vanilla-js
        </CodeBlock>
      </CodeGroup>
    </>
  }, {
    match: { frontend: "html" },
    title: "Add the script tag",
    content: <>
      Include the Whop Elements script in your HTML page.

      <CodeBlock language="html">
        {`<script src="https://latest.elements.whop.com/release/elements.js"></script>`}
      </CodeBlock>
    </>
  }
], [{
    match: { frontend: "react" },
    title: "Create the PayoutsSession",
    content: <>
      <p>Wrap your payout components with <code>Elements</code> and <code>PayoutsSession</code>. The session handles authentication using the token from your server endpoint.</p>
      <ul>
        <li><code>token</code> - Function that fetches the access token from your server</li>
        <li><code>companyId</code> - The connected account's ID</li>
        <li><code>redirectUrl</code> - Where to redirect after identity verification</li>
      </ul>
    </>
  }, {
    match: { frontend: "html" },
    title: "Create the PayoutsSession",
    content: <>
      <p>Initialize the elements and create a payout session. The session authenticates using the token from your server endpoint.</p>
      <ul>
        <li><code>token</code> - Async function that fetches the access token</li>
        <li><code>companyId</code> - The connected account's ID</li>
        <li><code>redirectUrl</code> - Where to redirect after identity verification</li>
      </ul>
    </>
  }
], {
  title: "Add the BalanceElement",
  content: <>
    Display the connected account's current balance. This shows how much money is available to pay out.
  </>
}, {
  title: "Add the WithdrawButtonElement",
  content: <>
    Add a button that allows users to initiate payouts. This opens a modal where users can enter the amount and confirm the payout.
  </>
}, {
  title: "Add the WithdrawalsElement",
  content: <>
    Display a list of past payouts with their status. This helps users track their payout history.
  </>
}]

}]}
  title="Embed payout components"
  description={<>
Allow your connected accounts to manage their own payouts through an embedded portal. This guide shows you how to set up the server-side token generation and client-side components.

<ExamplesLink href="https://whop.com/network/examples?filter=payouts" />

</>}
>
  ### Congratulations!

  You've successfully embedded the payout components in your application.

  ## Next steps

  <CardGroup cols={1}>
    <Card title="PayoutsSession Props" icon="gear" href="/developer/platforms/render-payout-portal#payoutssession-props">
      Customize the payout portal with additional configuration options like custom styling and event callbacks.
    </Card>

    <Card title="Hosted Payout Portal" icon="arrow-up-right-from-square" href="/developer/platforms/render-payout-portal#hosted-payout-portal">
      Skip embedding entirely and redirect users to a Whop-hosted payout portal.
    </Card>

    <Card title="Manual Payouts" icon="money-bill-transfer" href="/developer/platforms/manual-payouts">
      Programmatically trigger payouts, manage KYC verification, and control payout methods via the API.
    </Card>

    <Card title="Enroll Connected Accounts" icon="user-plus" href="/developer/platforms/enroll-connected-accounts">
      Learn how to create and manage Account objects for your connected accounts.
    </Card>
  </CardGroup>
</QuickStart>
