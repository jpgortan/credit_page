const { useState, useEffect, useRef, useMemo, memo, useCallback, createContext, useContext } = React;

// --- DATA & CONFIG ---
const initialContent = {
    overviewTitle: "A Strategic Roll-up for Market Leadership",
    overviewProse: "Merging two businesses that collectively settle approximately $3.25 billion per annum presents a strategic opportunity to create a market-leading commercial broker with significant advantages. The increased scale provides enhanced buying power and stronger negotiating leverage with insurers, suppliers and service partners. As a larger entity, the combined business gains a more influential voice in the market, better positioned to shape commercial terms and deliver improved outcomes for clients.\n\nThe merged group also becomes an attractive platform for major insurers and commercial players seeking efficient distribution partners or divestment opportunities. By bringing together operations and aligning strategies, the group creates a scalable, stable foundation for future growth. Importantly, once the two additional acquisitions currently underway are integrated, commercial volume will increase to approximately $5 billion annually. This would position the group as the largest commercial broker in the Australian market.\n\nThis is more than just a volume play—it’s about creating a unified, efficient, and future-ready business. The merger enables operational efficiencies, consolidation of talent, and a stronger, more cohesive brand presence. Leveraging shared data, technology and market expertise, the group will be able to deliver superior client service, drive innovation, and set a new benchmark in the commercial broking space.\n\nIn a competitive landscape, this strategic consolidation positions the group to lead—not just in size, but in capability, influence and long-term value.",
    marketShareTitle: "Market Share",
    marketShareText: "Solidify our position as the undisputed number one player in the industry through strategic consolidation.",
    innovationTitle: "Innovation & Value",
    innovationText: "Offer a comprehensive and unparalleled suite of products and services to our diverse client base.",
    shareholderValueTitle: "Shareholder Value",
    shareholderValueText: "Realise substantial financial returns through revenue synergies and operational efficiencies.",
    strategyTitle: "Phased Integration Roadmap",
    teamTitle: "A Foundation of Excellence",
    opportunityTitle: "The Opportunity: Consolidation & Value Realisation",
    opportunityProse: "On a standalone basis, each business currently attracts a valuation multiple of between 5 and 7 times EBITDA, reflecting their solid, but individual, market positions. However, the strategic objective of the merger is to build a business generating in excess of $20 million in annual earnings, underpinned by scale, stability and market leadership. A business of that size and strategic significance will attract a higher multiple in the range of 11 to 12 times EBITDA, in line with industry benchmarks for market-leading platforms. This valuation uplift is driven by enhanced operational efficiency, diversified revenue streams, stronger insurer relationships and the increased appeal to institutional investors or acquirers. The merged group becomes more than just the sum of its parts—it evolves into a high-performing, strategically valuable asset within the commercial broking landscape.\n\nA detailed look at the rationale for consolidating the commercial broking market and the value proposition for founding partners.",
    marketRationaleTitle: "The Market Rationale",
    marketRationale: "Most Commercial broker businesses, while successful, are typically founder-led. This model has limitations in realising scale benefits and maximising value. With no dominant players, consolidation is inevitable. The opportunity is to shape this future, create the market-leading commercial broker group, and realise significant enterprise value. For founding partners, this is a chance to play a key role in a market-changing opportunity while also achieving a significant value realisation event.",
    financialOfferTitle: "The Financial Offer for Target Firms",
    financialOffer: "An equitable and consistent valuation basis (EBITDA multiple) will be used for founding members, who will share equity in the combined business. A true-up will apply after Year 1, with a final payment at the end of Year 2 based on any change in relative business value, incentivising all partners to maximise profitable growth. You have the option of including 100% or part of your business in a shareholding in the group, with additional flexibility for ongoing business involvement.",
    businessSupportTitle: "Optional Business Support",
    businessSupport: "SLA will make available substantial support tailored to business needs, including a technology platform, client insights, compliance support, and proven prospecting. Support is optional and a management fee will apply depending on services required.",
    businessSupportNego: "The only non-negotiable is the continuation of quality deal submission, which is critical for lender negotiations.",
    valueRealisationTitle: "How We Realise Additional Value",
    valueRealisation: "Scale provides a dominant position to negotiate lender deals. The primary focus will be with lenders who have the appetite to tailor client solutions, including white-label products. The group will add value to lenders with additional volume, guaranteed deal quality, and insights to drive further sales.",
    valueRealisationUplift: "Any subsequent uplift in revenue from these enhanced lender deals will be used for any true-up calculations.",
    swotTitle: "SWOT Analysis",
    imageGalleryTitle: "Image Gallery",
    supportingDocsTitle: "Supporting Documents"
};
const financialData = {
    valuations: { labels: ['SLA', 'BF', 'Target 1', 'Target 2'], data: [52.5, 52.5, 18.0, 15.0] },
    income: { labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'], ebitda: [17964906, 19997514, 24718768, 30500022], freeCashFlow: [14640531, 18598764, 20852518, 30887522] }
};
const initialLeadershipTeam = [
    { id: 1, name: 'Stephen Moore', role: 'CEO', bio: "A visionary leader with extensive experience in scaling financial service businesses. As the former CEO of Choice Aggregation Services, he drove significant market share growth and technological innovation." },
    { id: 2, name: 'Andrew Stedwell', role: 'CFO', bio: "A seasoned financial executive with a strong background in media and digital transformations. His tenure as CFO for major publishers like Bauer and ACP Magazines gives him unique insight into managing complex, large-scale operations." },
    { id: 3, name: 'George Karam', role: 'Sales', bio: "A dynamic sales leader known for building high-performance teams and executing aggressive growth strategies. He has a proven track record of exceeding targets in competitive technology and finance sectors." },
];
const swotData = [
    { title: 'Strengths', items: ['Experienced Leadership', 'Diversified Revenue Streams', 'Enhanced Market Power', 'Significant Cross-Selling Opportunities'] },
    { title: 'Weaknesses', items: ['Integration Complexity', 'Initial Debt Burden', 'Execution Risk'] },
    { title: 'Opportunities', items: ['Market Leadership', 'Economies of Scale', 'Talent Attraction', 'Accelerated Innovation'] },
    { title: 'Threats', items: ['Competitor Reaction', 'Economic Downturn', 'Interest Rate Volatility', 'Integration Challenges'] },
];
const baseCashflowData = {
    initialCash: 3396667, mergedCoEBITDA: 1130625, t1EBITDA: 250000, t2EBITDA: 208333,
    shareholderPayout: -21000000, t1AcquisitionCost: -9000000, t2AcquisitionCost: -7500000,
    debtDrawdownT1: 4500000, debtDrawdownT2: 3750000,
    newStaffCostY1: -70833, newStaffCostY2: -88542, amortisationY2: -500000, dividendsY2: -281250,
};
const initialTimelineData = [
    { id: 1, time: "2025-07-01", title: "The Merger: A Synergistic Union", description: "This merger combines SLA's strong advisory and broker network with BF's. It creates a one-stop-shop for clients, driving significant cross-selling opportunities and enhancing our competitive position." },
    { id: 2, time: "2025-10-01", title: "First Acquisition", description: "Acquisition and integration of Target 1, expanding our product capabilities and onboarding new talent." },
    { id: 3, time: "2026-01-01", title: "Second Acquisition", description: "Acquisition of Target 2, finalising the initial consolidation and realising full-scale operational synergies." },
];
const initialImageData = [
    { id: 1, src: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Modern white house with a pool' },
    { id: 2, src: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'A small, charming house with a red roof' },
    { id: 3, src: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'A contemporary house nestled in a forest' },
    { id: 4, src: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'A classic suburban house with a green lawn' },
    { id: 5, src: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'A luxury house with a wooden exterior and large windows' },
];
const initialSupportingDocs = [
    { id: 1, title: "FY2024 Financial Statements", description: "Audited financial statements for the fiscal year 2024.", file: null, url: "#" },
    { id: 2, title: "Market Research Report Q2 2025", description: "In-depth analysis of market trends and competitor landscape.", file: null, url: "#" },
    { id: 3, title: "Due Diligence Checklist", description: "Comprehensive checklist for target acquisitions.", file: null, url: "#" }
];

// --- HOOKS ---
const useIntersectionObserver = (options) => {
    const [entries, setEntries] = useState([]);
    const observer = useRef(null);
    useEffect(() => {
        observer.current = new IntersectionObserver((observedEntries) => { setEntries(observedEntries); }, options);
        const currentObserver = observer.current;
        return () => { if (currentObserver) currentObserver.disconnect(); };
    }, [options]);
    return [observer.current, entries];
};
const useScrollFadeIn = () => {
    const [observer, entries] = useIntersectionObserver({ threshold: 0.1 });
    useEffect(() => {
        const elements = document.querySelectorAll('.fade-in-up');
        if (observer) elements.forEach(el => observer.observe(el));
        return () => { if (observer) elements.forEach(el => observer.unobserve(el)); };
    }, [observer]);
    useEffect(() => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, [entries]);
};

// --- COMPONENTS ---
const AppContext = createContext();

const EditableText = ({ contentKey, value, onSave, as: Component = 'p', className = '' }) => {
    const [currentValue, setCurrentValue] = useState(value);
    const textareaRef = useRef(null);
    const { isGlobalEditMode } = useContext(AppContext);
    useEffect(() => {
        setCurrentValue(value);
    }, [value]);
    useEffect(() => {
        if (isGlobalEditMode && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [isGlobalEditMode, currentValue]);
    const handleBlur = () => {
        if (currentValue !== value) {
            onSave(contentKey, currentValue);
        }
    };
    if (isGlobalEditMode) {
        return (
            <textarea
                ref={textareaRef}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                className={`${className} w-full p-2 bg-orange-50 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none`}
                rows="1"
            />
        );
    }
    return (
        <Component className={`${className} editable-highlight whitespace-pre-wrap`}>{value}</Component>
    );
};

const ChartComponent = memo(({ type, data, options }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        if (!canvasRef.current) return;
        const chart = new Chart(canvasRef.current, { type, data, options });
        return () => chart.destroy();
    }, [type, data, options]);
    return <canvas ref={canvasRef}></canvas>;
});

const IntroScreen = ({ onLaunch }) => {
    const [headline, setHeadline] = useState('');
    useEffect(() => {
        let i = 0;
        const fullText = "Credit Appetite Paper";
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setHeadline(prev => prev + fullText.charAt(i++));
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center z-50 p-4">
            <div className="text-center">
                <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-4 min-h-[84px] md:min-h-[144px]">{headline}</h1>
                <p className="text-lg md:text-xl text-gray-500 mb-8">A confidential interactive transaction briefing document.</p>
                <button onClick={onLaunch} className="bg-[#F97316] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-900 transition-all transform hover:scale-105">View Briefing</button>
            </div>
        </div>
    );
};

const PasswordGate = ({ onAuthenticated }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'synergy2025') onAuthenticated();
        else setError(true);
    };
    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Credit Appetite Paper</h2>
                <p className="text-center text-gray-500 mb-6">Access Restricted</p>
                <form onSubmit={handleSubmit}>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#F97316]'}`} placeholder="Enter Password" />
                    {error && <p className="text-red-500 text-sm mt-2">Incorrect password. Please try again.</p>}
                    <button type="submit" className="w-full bg-[#F97316] text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gray-900 transition-colors">Authenticate</button>
                </form>
            </div>
        </div>
    );
};

const Header = ({ activeSection, onDownload, isDownloading, onToggleEditMode, isGlobalEditMode, onShare }) => {
    const navItems = [
        { id: "overview", label: "Overview" },
        { id: "strategy", label: "Strategy" },
        { id: "opportunity", label: "Opportunity" },
        { id: "key-numbers", label: "Numbers" },
        { id: "financials", label: "Financials" },
        { id: "interactive-financials", label: "Interactive" },
        { id: "team", label: "Team" },
        { id: "swot-analysis", label: "SWOT" },
        { id: "image-gallery", label: "Gallery" },
        { id: "supporting-documents", label: "Docs" }
    ];
    return (
        <header id="main-header" className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-xl font-bold text-gray-900">Credit Appetite Paper</h1>
                    <nav className="hidden xl:flex flex-grow items-center justify-center px-8">
                        <div className="flex items-center space-x-1 bg-gray-200 p-1 rounded-full w-full">
                            {navItems.map(item => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`
                                        flex-1 text-center text-xs font-semibold capitalize rounded-full py-1.5 px-3
                                        transition-all duration-200 ease-in-out
                                        ${activeSection === item.id
                                            ? 'bg-orange-600 text-white shadow-sm'
                                            : 'text-gray-600 hover:bg-white/60'
                                        }
                                    `}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                    <div className="flex items-center space-x-2 ml-4">
                        <button onClick={onShare} className="font-bold py-2 px-4 rounded-full text-sm transition-colors bg-gray-600 text-white hover:bg-gray-700">
                            Share
                        </button>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600">Edit Mode</span>
                            <button
                                onClick={onToggleEditMode}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${isGlobalEditMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isGlobalEditMode ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        <button
                            id="download-pdf-btn"
                            onClick={onDownload}
                            disabled={isDownloading}
                            className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
                        >
                            {isDownloading ? '...' : 'PDF'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

const Section = ({ id, children, className = '', style }) => <section id={id} className={`mb-24 scroll-mt-24 ${className}`} style={style}>{children}</section>;

const SWOTAccordion = ({ title, items, forceOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isEffectivelyOpen = forceOpen || isOpen;
    return (
        <div className="fade-in-up">
            <button onClick={() => setIsOpen(!isOpen)} className="swot-toggle w-full p-5 text-left font-bold text-xl bg-white border border-gray-200 rounded-lg flex justify-between items-center shadow-sm" aria-expanded={isEffectivelyOpen}>
                <span>{title}</span>
                <span className="swot-icon text-2xl text-gray-400">{isEffectivelyOpen ? '-' : '+'}</span>
            </button>
            <div className={`swot-content mt-2 bg-white p-4 rounded-lg border border-gray-200 text-gray-600 ${isEffectivelyOpen ? '' : 'hidden'}`}>
                <ul className="list-disc list-inside space-y-2">{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </div>
        </div>
    );
};

// ... (All Modal components remain the same)
const TimelineEditorModal = ({ isOpen, onClose, onSave, data }) => {
    const [localData, setLocalData] = useState([]);
    useEffect(() => {
        setLocalData(JSON.parse(JSON.stringify(data)));
    }, [data]);
    if (!isOpen) return null;
    const handleFieldChange = (index, field, value) => {
        const updatedData = [...localData];
        updatedData[index][field] = value;
        setLocalData(updatedData);
    };
    const addMilestone = () => {
        setLocalData([...localData, { id: Date.now(), time: '', title: '', description: '' }]);
    };
    const deleteMilestone = (index) => {
        const updatedData = [...localData];
        updatedData.splice(index, 1);
        setLocalData(updatedData);
    };
    const handleSave = () => {
        onSave(localData);
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Timeline Milestones</h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                    {localData.map((milestone, index) => (
                        <div key={milestone.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 border rounded-lg">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input type="date" value={milestone.time} onChange={(e) => handleFieldChange(index, 'time', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event / Title</label>
                                <input type="text" value={milestone.title} onChange={(e) => handleFieldChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div className="md:col-span-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea value={milestone.description} onChange={(e) => handleFieldChange(index, 'description', e.target.value)} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                            </div>
                            <div className="md:col-span-1 flex items-end justify-end">
                                <button onClick={() => deleteMilestone(index)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 mt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                 <button onClick={addMilestone} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Add Milestone</button>
                <div className="flex justify-end space-x-4 mt-8">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">Save Changes</button>
                </div>
            </div>
        </div>
    );
};
const TeamEditorModal = ({ isOpen, onClose, onSave, data }) => {
    const [localData, setLocalData] = useState([]);
    useEffect(() => {
        setLocalData(JSON.parse(JSON.stringify(data)));
    }, [data]);
    if (!isOpen) return null;
    const handleFieldChange = (index, field, value) => {
        const updatedData = [...localData];
        updatedData[index][field] = value;
        setLocalData(updatedData);
    };
    const addMember = () => {
        setLocalData([...localData, { id: Date.now(), name: '', role: '', bio: '' }]);
    };
    const deleteMember = (index) => {
        const updatedData = [...localData];
        updatedData.splice(index, 1);
        setLocalData(updatedData);
    };
    const handleSave = () => {
        onSave(localData);
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Team Members</h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                    {localData.map((member, index) => (
                        <div key={member.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 border rounded-lg">
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" value={member.name} onChange={(e) => handleFieldChange(index, 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <input type="text" value={member.role} onChange={(e) => handleFieldChange(index, 'role', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div className="md:col-span-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Key Information / CV</label>
                                <textarea value={member.bio} onChange={(e) => handleFieldChange(index, 'bio', e.target.value)} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                            </div>
                            <div className="md:col-span-1 flex items-end justify-end">
                                <button onClick={() => deleteMember(index)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 mt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                 <button onClick={addMember} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Add Member</button>
                <div className="flex justify-end space-x-4 mt-8">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">Save Changes</button>
                </div>
            </div>
        </div>
    );
};
const SupportingDocsEditorModal = ({ isOpen, onClose, onSave, data }) => {
    const [localData, setLocalData] = useState([]);
    useEffect(() => {
        setLocalData(JSON.parse(JSON.stringify(data)));
    }, [data]);
    if (!isOpen) return null;
    const handleFieldChange = (index, field, value) => {
        const updatedData = [...localData];
        updatedData[index][field] = value;
        setLocalData(updatedData);
    };
    const handleFileChange = (index, file) => {
        const updatedData = [...localData];
        if (updatedData[index].url && updatedData[index].url.startsWith('blob:')) {
            URL.revokeObjectURL(updatedData[index].url);
        }
        updatedData[index].file = file;
        updatedData[index].url = file ? URL.createObjectURL(file) : "#";
        setLocalData(updatedData);
    };
    const addDoc = () => {
        setLocalData([...localData, { id: Date.now(), title: '', description: '', file: null, url: '#' }]);
    };
    const deleteDoc = (index) => {
        const updatedData = [...localData];
        if (updatedData[index].url && updatedData[index].url.startsWith('blob:')) {
            URL.revokeObjectURL(updatedData[index].url);
        }
        updatedData.splice(index, 1);
        setLocalData(updatedData);
    };
    const handleSave = () => {
        onSave(localData);
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Supporting Documents</h2>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                    {localData.map((doc, index) => (
                        <div key={doc.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 border rounded-lg">
                            <div className="md:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                                <input type="text" value={doc.title} onChange={(e) => handleFieldChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div className="md:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <input type="text" value={doc.description} onChange={(e) => handleFieldChange(index, 'description', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor={`file-upload-${doc.id}`} className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                                                <span>Upload a file</span>
                                                <input id={`file-upload-${doc.id}`} name="file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(index, e.target.files[0])} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">{doc.file ? doc.file.name : 'No file chosen'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-1 flex items-end justify-end">
                                <button onClick={() => deleteDoc(index)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 mt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                 <button onClick={addDoc} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Add Document</button>
                <div className="flex justify-end space-x-4 mt-8">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">Save Changes</button>
                </div>
            </div>
        </div>
    );
};
const ProfitabilityModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;
    const formatCurrency = (value) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-lg text-gray-800" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Annual Profitability Summary</h2>
                        <p className="text-gray-600">This is a 12-month projection starting from <span className="font-bold">Month {data.startMonth}</span>.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <span className="font-semibold">Total EBITDA</span>
                        <span className="font-mono text-lg">{formatCurrency(data.totalEBITDA)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3">
                        <span className="font-semibold text-sm">Total Debt Interest</span>
                        <span className={`font-mono ${data.totalDebtInterest < 0 ? 'text-red-600' : ''}`}>{formatCurrency(data.totalDebtInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3">
                        <span className="font-semibold text-sm">Total New Staff Costs</span>
                        <span className={`font-mono ${data.totalNewStaffCosts < 0 ? 'text-red-600' : ''}`}>{formatCurrency(data.totalNewStaffCosts)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3">
                        <span className="font-semibold text-sm">Total Amortisation</span>
                        <span className={`font-mono ${data.totalAmortisation < 0 ? 'text-red-600' : ''}`}>{formatCurrency(data.totalAmortisation)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3">
                        <span className="font-semibold text-sm">Total Dividends</span>
                        <span className={`font-mono ${data.totalDividends < 0 ? 'text-red-600' : ''}`}>{formatCurrency(data.totalDividends)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-100 border-t-2 border-gray-200 rounded-b-md mt-4">
                        <span className="font-bold text-xl">Projected Net Profit</span>
                        <span className={`font-mono text-xl font-bold ${data.netProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(data.netProfit)}</span>
                    </div>
                </div>
                <button onClick={onClose} className="w-full bg-[#F97316] text-white font-bold py-2 px-4 rounded-md mt-6 hover:bg-gray-900 transition-colors">Close</button>
            </div>
        </div>
    );
};

const InteractiveFinancials = () => {
    const [growthFactor, setGrowthFactor] = useState(6);
    const [interestRate, setInterestRate] = useState(9);
    const [t1AcqMonth, setT1AcqMonth] = useState(3);
    const [t2AcqMonth, setT2AcqMonth] = useState(6);
    const [modalData, setModalData] = useState(null);
    const cashflow = useMemo(() => {
        const results = [];
        let openingBalance = baseCashflowData.initialCash;
        let debtBalance = 0;
        const monthlyGrowth = Math.pow(1 + growthFactor / 100, 1 / 12) - 1;
        for (let i = 1; i <= 24; i++) {
            const row = {};
            row.month = i;
            row.openingBalance = openingBalance;
            row.debtInterest = -(debtBalance * (interestRate / 100 / 12));
            row.mergedCoEBITDA = baseCashflowData.mergedCoEBITDA * Math.pow(1 + monthlyGrowth, i - 1);
            row.t1EBITDA = (i >= t1AcqMonth) ? baseCashflowData.t1EBITDA * Math.pow(1 + monthlyGrowth, i - t1AcqMonth) : 0;
            row.t2EBITDA = (i >= t2AcqMonth) ? baseCashflowData.t2EBITDA * Math.pow(1 + monthlyGrowth, i - t2AcqMonth) : 0;
            row.totalEBITDA = row.mergedCoEBITDA + row.t1EBITDA + row.t2EBITDA;
            row.debtDrawdown = 0;
            if (i === 1) row.debtDrawdown += 24000000;
            if (i === t1AcqMonth) row.debtDrawdown += baseCashflowData.debtDrawdownT1;
            if (i === t2AcqMonth) row.debtDrawdown += baseCashflowData.debtDrawdownT2;
            row.shareholderPayout = (i === 1) ? baseCashflowData.shareholderPayout : 0;
            row.acquisitionPayments = 0;
            if (i === t1AcqMonth) row.acquisitionPayments += baseCashflowData.t1AcquisitionCost;
            if (i === t2AcqMonth) row.acquisitionPayments += baseCashflowData.t2AcquisitionCost;
            row.newStaffCosts = (i <= 12) ? baseCashflowData.newStaffCostY1 : baseCashflowData.newStaffCostY2;
            row.amortisation = (i > 12) ? baseCashflowData.amortisationY2 : 0;
            row.dividends = (i > 12) ? baseCashflowData.dividendsY2 : 0;
            row.netCashflow = row.totalEBITDA + row.debtDrawdown + row.shareholderPayout + row.acquisitionPayments + row.debtInterest + row.newStaffCosts + row.amortisation + row.dividends;
            row.closingBalance = openingBalance + row.netCashflow;
            openingBalance = row.closingBalance;
            debtBalance += row.debtDrawdown;
            results.push(row);
        }
        return results;
    }, [growthFactor, interestRate, t1AcqMonth, t2AcqMonth]);
    const handleMonthClick = (monthIndex) => {
        const relevantMonths = cashflow.slice(monthIndex, monthIndex + 12);
        if (relevantMonths.length === 0) return;
        const calculateTotal = (key) => relevantMonths.reduce((sum, month) => sum + month[key], 0);
        const totalEBITDA = calculateTotal('totalEBITDA');
        const totalDebtInterest = calculateTotal('debtInterest');
        const totalNewStaffCosts = calculateTotal('newStaffCosts');
        const totalAmortisation = calculateTotal('amortisation');
        const totalDividends = calculateTotal('dividends');
        const netProfit = totalEBITDA + totalDebtInterest + totalNewStaffCosts + totalAmortisation + totalDividends;
        setModalData({ startMonth: monthIndex + 1, totalEBITDA, totalDebtInterest, totalNewStaffCosts, totalAmortisation, totalDividends, netProfit });
    };
    const formatCurrency = (value) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    return (
        <Section id="interactive-financials" className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 fade-in-up">Interactive Financials</h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16 fade-in-up" style={{ transitionDelay: '100ms' }}>Adjust the sliders to model different scenarios and see the immediate impact on the 24-month cashflow projection. Click on a month's header for an annual profitability summary.</p>
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 fade-in-up shadow-lg mb-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <label htmlFor="growthFactor" className="font-bold">Annual Growth Factor: {growthFactor}%</label>
                        <input id="growthFactor" type="range" min="0" max="15" value={growthFactor} onChange={(e) => setGrowthFactor(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                    </div>
                    <div>
                        <label htmlFor="interestRate" className="font-bold">Annual Interest Rate: {interestRate}%</label>
                        <input id="interestRate" type="range" min="0" max="15" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                    </div>
                    <div>
                        <label htmlFor="t1AcqMonth" className="font-bold">Target 1 Acq. Month: {t1AcqMonth}</label>
                        <input id="t1AcqMonth" type="range" min="1" max="12" value={t1AcqMonth} onChange={(e) => setT1AcqMonth(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                    </div>
                    <div>
                        <label htmlFor="t2AcqMonth" className="font-bold">Target 2 Acq. Month: {t2AcqMonth}</label>
                        <input id="t2AcqMonth" type="range" min="1" max="12" value={t2AcqMonth} onChange={(e) => setT2AcqMonth(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                    </div>
                </div>
            </div>
            <div id="cashflow-table-container" className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-lg fade-in-up">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                        <tr>
                            <th className="px-4 py-3 sticky left-0 bg-gray-50 z-10">Metric</th>
                            {cashflow.map(m => (
                                <th key={m.month} className="px-4 py-3 text-right cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => handleMonthClick(m.month - 1)} title={`Calculate 12-month profit from Month ${m.month}`}>
                                    {`M${m.month}`}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(cashflow[0]).filter(k => k !== 'month').map(key => (
                            <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2 font-semibold capitalize sticky left-0 bg-white hover:bg-gray-50">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                {cashflow.map(m => <td key={`${key}-${m.month}`} className={`px-4 py-2 text-right font-mono ${m[key] < 0 ? 'text-red-600' : 'text-gray-800'}`}>{formatCurrency(m[key])}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProfitabilityModal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
        </Section>
    );
};

const FinancialSummary = memo(() => {
    const formatCurrency = (value) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    const formatMillions = (value) => '$' + (value / 1000000).toFixed(1) + 'M';
    const sharedChartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#1F2937' } }, tooltip: { backgroundColor: '#ffffff', titleColor: '#1F2937', bodyColor: '#4B5563', borderColor: '#E5E7EB', borderWidth: 1, padding: 10, } }, scales: { y: { grid: { color: 'rgba(0, 0, 0, 0.05)' }, ticks: { color: '#4B5563' }, title: { display: true, color: '#4B5563' } }, x: { grid: { display: false }, ticks: { color: '#4B5563' } } } };
    return (
        <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 p-6 rounded-lg fade-in-up shadow-lg">
                    <h3 className="text-xl font-bold text-center mb-4">Entity Valuations (in Millions)</h3>
                    <div className="h-80">
                        <ChartComponent type='bar' data={{ labels: financialData.valuations.labels, datasets: [{ label: 'Valuation in Millions ($)', data: financialData.valuations.data, backgroundColor: ['#FB923C', '#FB923C', '#FDBA74', '#FDBA74'], borderWidth: 0 }] }} options={{ ...sharedChartOptions, plugins: { ...sharedChartOptions.plugins, legend: { display: false }, tooltip: { ...sharedChartOptions.plugins.tooltip, callbacks: { label: (c) => `$${c.parsed.y} Million` } } }, scales: { ...sharedChartOptions.scales, y: { ...sharedChartOptions.scales.y, beginAtZero: true, title: { ...sharedChartOptions.scales.y.title, text: 'Valuation ($M)' } } } }} />
                    </div>
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-lg fade-in-up shadow-lg">
                    <h3 className="text-xl font-bold text-center mb-4">Projected Income (Years 1-4)</h3>
                    <div className="h-80">
                        <ChartComponent type='bar' data={{ labels: financialData.income.labels, datasets: [{ label: 'Projected EBITDA', data: financialData.income.ebitda, backgroundColor: '#FB923C' }, { label: 'Free Cash Flow', data: financialData.income.freeCashFlow, backgroundColor: '#FDBA74' }] }} options={{ ...sharedChartOptions, plugins: { ...sharedChartOptions.plugins, legend: { position: 'top' }, tooltip: { ...sharedChartOptions.plugins.tooltip, callbacks: { label: (c) => `${c.dataset.label}: ${formatCurrency(c.parsed.y)}` } } }, scales: { ...sharedChartOptions.scales, y: { ...sharedChartOptions.scales.y, ticks: { callback: (v) => formatMillions(v) }, title: { ...sharedChartOptions.scales.y.title, text: 'Amount ($)' } } } }} />
                    </div>
                </div>
            </div>
        </div>
    )
});

const App = () => {
    const [appState, setAppState] = useState('intro'); // 'intro', 'auth', 'main'
    const [activeSection, setActiveSection] = useState('overview');
    const [isDownloading, setIsDownloading] = useState(false);
    const [forceSwotOpen, setForceSwotOpen] = useState(false);
    const [textContent, setTextContent] = useState(initialContent);
    const [isGlobalEditMode, setIsGlobalEditMode] = useState(false);
    const [timelineData, setTimelineData] = useState(initialTimelineData);
    const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
    const [leadershipTeam, setLeadershipTeam] = useState(initialLeadershipTeam);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [supportingDocs, setSupportingDocs] = useState(initialSupportingDocs);
    const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

    useScrollFadeIn();

    const handleContentSave = (key, newValue) => {
        setTextContent(prev => ({ ...prev, [key]: newValue }));
    };
    const handleSaveTimeline = (newTimelineData) => {
        setTimelineData(newTimelineData);
    };
    const handleSaveTeam = (newTeamData) => {
        setLeadershipTeam(newTeamData);
    };
    const handleSaveDocs = (newDocsData) => {
        setSupportingDocs(newDocsData);
    };
    
    const handleShare = async () => {
        const shareData = {
            title: 'Credit Appetite Paper',
            text: 'Check out this confidential interactive transaction briefing document.',
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error("Share failed:", err);
            alert('Failed to share. Please copy the link manually.');
        }
    };

    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        setForceSwotOpen(true);
        await new Promise(resolve => setTimeout(resolve, 100));

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        
        const margin = 15;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const contentWidth = pageWidth - margin * 2;
        let currentY = margin;

        const checkPageEnd = (y, requiredHeight) => {
            if (y + requiredHeight > pageHeight - margin) {
                doc.addPage();
                return margin;
            }
            return y;
        };
        const addTitle = (text, y) => {
            doc.setFontSize(22).setFont('helvetica', 'bold');
            doc.text(text, pageWidth / 2, y, { align: 'center' });
            return y + 12;
        };
        const addSectionTitle = (text, y) => {
            doc.setFontSize(14).setFont('helvetica', 'bold');
            doc.text(text, margin, y, { align: 'left' });
            return y + 8;
        };
        const addWrappedText = (text, y, options = {}) => {
            const { fontSize = 9, style = 'normal', indent = 0 } = options;
            doc.setFontSize(fontSize).setFont('helvetica', style);
            const lines = doc.splitTextToSize(text, contentWidth - indent);
            const textHeight = lines.length * (fontSize * 0.35);
            y = checkPageEnd(y, textHeight + 5);
            doc.text(lines, margin + indent, y, { align: 'left' });
            return y + textHeight + 6;
        };
        const addElementAsImage = async (selector, y, options = {}) => {
            const { isJpg = false, bgColor = '#ffffff' } = options;
            const element = document.querySelector(selector);
            if (!element) return y;

            const canvas = await html2canvas(element, { scale: 3, useCORS: true, backgroundColor: bgColor });
            const imgData = canvas.toDataURL(isJpg ? 'image/jpeg' : 'image/png', 0.85);
            const imgProps = doc.getImageProperties(imgData);

            let imgWidth = contentWidth;
            let imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            y = checkPageEnd(y, imgHeight + 10);
            
            if (imgHeight > pageHeight - margin * 2) {
                imgHeight = pageHeight - margin * 2 - 10;
                imgWidth = imgHeight * (imgProps.width / imgProps.height);
            }

            const xPos = margin + (contentWidth - imgWidth) / 2;
            doc.addImage(imgData, isJpg ? 'JPEG' : 'PNG', xPos, y, imgWidth, imgHeight);
            return y + imgHeight + 10;
        };

        // --- PDF GENERATION LOGIC ---
        currentY = addTitle('Synergy Strategy Document', currentY);
        currentY = addSectionTitle(textContent.overviewTitle, currentY);
        currentY = addWrappedText(textContent.overviewProse, currentY);
        currentY = addSectionTitle(textContent.strategyTitle, currentY);
        currentY = await addElementAsImage('#horizontal-timeline', currentY, { bgColor: null });

        doc.addPage();
        currentY = margin;
        currentY = addTitle(textContent.opportunityTitle, currentY);
        currentY = addWrappedText(textContent.opportunityProse, currentY);
        currentY = addSectionTitle(textContent.marketRationaleTitle, currentY);
        currentY = addWrappedText(textContent.marketRationale, currentY);
        currentY = addSectionTitle(textContent.financialOfferTitle, currentY);
        currentY = addWrappedText(textContent.financialOffer, currentY);

        doc.addPage();
        currentY = margin;
        currentY = addTitle('Opportunity (Cont.) & Financials', currentY);
        currentY = addSectionTitle(textContent.businessSupportTitle, currentY);
        currentY = addWrappedText(textContent.businessSupport + ' ' + textContent.businessSupportNego, currentY);
        currentY = addSectionTitle(textContent.valueRealisationTitle, currentY);
        currentY = addWrappedText(textContent.valueRealisation + ' ' + textContent.valueRealisationUplift, currentY);
        currentY = addSectionTitle('Key Numbers at a Glance', currentY);
        currentY = await addElementAsImage('#key-numbers .bg-white', currentY, { isJpg: true });

        doc.addPage();
        currentY = margin;
        currentY = addTitle('Financial Summary & Leadership', currentY);
        currentY = addSectionTitle('Financial Summary Charts', currentY);
        currentY = await addElementAsImage('#financials .grid', currentY, { isJpg: true });
        currentY = addSectionTitle('Leadership Team', currentY);
        currentY = addWrappedText(leadershipTeam.map(m => `${m.name} (${m.role}): ${m.bio}`).join('\n\n'), currentY);

        doc.addPage();
        currentY = margin;
        currentY = addTitle('SWOT Analysis', currentY);
        currentY = await addElementAsImage('#swot-analysis', currentY, { isJpg: true, bgColor: '#F9FAFB' });

        doc.addPage();
        currentY = margin;
        currentY = addTitle('Interactive Financials - Cashflow Projection', currentY);
        currentY = addWrappedText('The following table represents the cashflow projection based on the currently selected parameters in the interactive document.', currentY, { style: 'italic' });
        await addElementAsImage('#cashflow-table-container', currentY, { isJpg: true });
        
        doc.addPage();
        currentY = margin;
        currentY = addTitle('Supporting Documents', currentY);
        supportingDocs.forEach(doc => {
            currentY = addWrappedText(`${doc.title}: ${doc.description}`, currentY);
        });

        doc.save('Synergy-Strategy-Document-Comprehensive.pdf');

        setForceSwotOpen(false);
        setIsDownloading(false);
    };

    useEffect(() => {
        if (appState === 'main') {
            const observer = new IntersectionObserver(
                (entries) => {
                    const intersectingEntries = entries.filter(e => e.isIntersecting);
                    if (intersectingEntries.length > 0) {
                        intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                        setActiveSection(intersectingEntries[0].target.id);
                    }
                },
                {
                    threshold: 0.1,
                    rootMargin: "-100px 0px -50% 0px"
                }
            );
            const sections = document.querySelectorAll('section');
            sections.forEach(section => observer.observe(section));
            return () => {
                sections.forEach(section => observer.unobserve(section));
            };
        }
    }, [appState]);

    if (appState === 'intro') {
        return <IntroScreen onLaunch={() => setAppState('auth')} />;
    }
    if (appState === 'auth') {
        return <PasswordGate onAuthenticated={() => setAppState('main')} />;
    }

    return (
        <AppContext.Provider value={{ isGlobalEditMode }}>
            <div className={isGlobalEditMode ? 'global-edit-mode' : ''}>
                <div id="main-content">
                    <Header 
                        activeSection={activeSection} 
                        onDownload={handleDownloadPDF} 
                        isDownloading={isDownloading} 
                        onToggleEditMode={() => setIsGlobalEditMode(!isGlobalEditMode)} 
                        isGlobalEditMode={isGlobalEditMode}
                        onShare={handleShare}
                    />
                    <main>
                        <Section id="overview" className="py-20 bg-gray-50">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <EditableText as="h2" contentKey="overviewTitle" value={textContent.overviewTitle} onSave={handleContentSave} className="text-4xl md:text-5xl font-bold mb-4 fade-in-up text-gray-900 text-center" />
                                <div className="text-lg text-gray-600 text-left mb-16 fade-in-up max-w-4xl mx-auto" style={{ transitionDelay: '100ms' }}>
                                    <EditableText contentKey="overviewProse" value={textContent.overviewProse} onSave={handleContentSave} />
                                </div>
                                <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
                                    <div className="bg-white border border-gray-200 p-8 rounded-lg fade-in-up shadow-sm" style={{ transitionDelay: '200ms' }}>
                                        <EditableText as="h3" contentKey="marketShareTitle" value={textContent.marketShareTitle} onSave={handleContentSave} className="text-2xl font-bold text-[#F97316] mb-3" />
                                        <EditableText as="p" contentKey="marketShareText" value={textContent.marketShareText} onSave={handleContentSave} className="text-gray-600" />
                                    </div>
                                    <div className="bg-white border border-gray-200 p-8 rounded-lg fade-in-up shadow-sm" style={{ transitionDelay: '300ms' }}>
                                        <EditableText as="h3" contentKey="innovationTitle" value={textContent.innovationTitle} onSave={handleContentSave} className="text-2xl font-bold text-[#F97316] mb-3" />
                                        <EditableText as="p" contentKey="innovationText" value={textContent.innovationText} onSave={handleContentSave} className="text-gray-600" />
                                    </div>
                                    <div className="bg-white border border-gray-200 p-8 rounded-lg fade-in-up shadow-sm" style={{ transitionDelay: '400ms' }}>
                                        <EditableText as="h3" contentKey="shareholderValueTitle" value={textContent.shareholderValueTitle} onSave={handleContentSave} className="text-2xl font-bold text-[#F97316] mb-3" />
                                        <EditableText as="p" contentKey="shareholderValueText" value={textContent.shareholderValueText} onSave={handleContentSave} className="text-gray-600" />
                                    </div>
                                </div>
                            </div>
                        </Section>
                        
                        <Section id="strategy" className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <EditableText as="h2" contentKey="strategyTitle" value={textContent.strategyTitle} onSave={handleContentSave} className="text-4xl md:text-5xl font-bold fade-in-up inline-block" />
                                {isGlobalEditMode && (
                                    <button onClick={() => setIsTimelineModalOpen(true)} className="ml-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors inline-block align-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                )}
                            </div>
                            <div id="horizontal-timeline" className="w-full fade-in-up">
                                <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-4">
                                    {timelineData.sort((a, b) => new Date(a.time) - new Date(b.time)).map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            <div className="flex-1 flex flex-col timeline-card relative group">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-xl z-10">{index + 1}</div>
                                                </div>
                                                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center flex-grow mt-[-20px] pt-8">
                                                    <p className="text-sm font-semibold text-gray-500">{new Date(item.time).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                                    <h3 className="text-xl font-bold my-2">{item.title}</h3>
                                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                                </div>
                                            </div>
                                            {index < timelineData.length - 1 && (<div className="hidden md:flex items-center self-center h-full pt-10"><svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path></svg></div>)}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </Section>

                        <Section id="opportunity" className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <EditableText as="h2" contentKey="opportunityTitle" value={textContent.opportunityTitle} onSave={handleContentSave} className="text-4xl md:text-5xl font-bold text-center mb-4 fade-in-up" />
                            <div className="text-lg text-gray-600 text-left mb-12 fade-in-up max-w-4xl mx-auto" style={{ transitionDelay: '100ms' }}>
                                <EditableText contentKey="opportunityProse" value={textContent.opportunityProse} onSave={handleContentSave} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                                <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg fade-in-up"><EditableText as="h3" contentKey="marketRationaleTitle" value={textContent.marketRationaleTitle} onSave={handleContentSave} className="text-2xl font-bold text-[#F97316] mb-4" /><EditableText contentKey="marketRationale" value={textContent.marketRationale} onSave={handleContentSave} className="text-gray-600 mb-4" /></div>
                                <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg fade-in-up"><EditableText as="h3" contentKey="financialOfferTitle" value={textContent.financialOfferTitle} onSave={handleContentSave} className="text-2xl font-bold text-[#F97316] mb-4" /><EditableText contentKey="financialOffer" value={textContent.financialOffer} onSave={handleContentSave} className="text-gray-600 mb-4" /></div>
                                <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg fade-in-up"><EditableText as="h3" contentKey="businessSupportTitle" value={textContent.businessSupportTitle} onSave={handleContentSave} className="text-2xl font-bold text-[#F97316] mb-4" /><EditableText contentKey="businessSupport" value={textContent.businessSupport} onSave={handleContentSave} className="text-gray-600 mb-4" /><EditableText contentKey="businessSupportNego" value={textContent.businessSupportNego} onSave={handleContentSave} className="text-gray-600 font-semibold" /></div>
                                <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg fade-in-up"><EditableText as="h3" contentKey="valueRealisationTitle" value={textContent.valueRealisationTitle} onSave={handleContentSave} className="text-2xl font-bold text-[#F97316] mb-4" /><EditableText contentKey="valueRealisation" value={textContent.valueRealisation} onSave={handleContentSave} className="text-gray-600 mb-4" /><EditableText contentKey="valueRealisationUplift" value={textContent.valueRealisationUplift} onSave={handleContentSave} className="text-gray-600" /></div>
                            </div>
                        </Section>

                        <Section id="key-numbers" className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 fade-in-up">Key Numbers at a Glance</h2>
                            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16 fade-in-up" style={{ transitionDelay: '100ms' }}>A detailed breakdown of the core financial data underpinning the valuation and structure of Project Synergy.</p>
                            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 fade-in-up shadow-lg"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"><div className="space-y-6"><h3 className="text-2xl font-bold text-[#F97316] border-b border-gray-200 pb-2">Valuation & Acquisition</h3><table className="w-full text-left"><thead className="text-gray-500"><tr><th className="pb-2 font-normal">Metric</th><th className="pb-2 text-right font-normal">Value</th></tr></thead><tbody><tr className="border-b border-gray-200"><td className="py-2">Total Value</td><td className="py-2 text-right font-mono">$138,000,000</td></tr><tr className="border-b border-gray-200"><td className="py-2">Total Consideration Shares</td><td className="py-2 text-right font-mono">$100,500,000</td></tr><tr className="border-b border-gray-200"><td className="py-2">Total Consideration Cash</td><td className="py-2 text-right font-mono">$37,500,000</td></tr><tr className="border-b border-gray-200"><td className="py-2">First Payment (Cash)</td><td className="py-2 text-right font-mono">$21,000,000</td></tr><tr><td className="pt-2">Second Payment (Cash)</td><td className="pt-2 text-right font-mono">$16,500,000</td></tr></tbody></table></div><div className="space-y-6"><h3 className="text-2xl font-bold text-[#F97316] border-b border-gray-200 pb-2">Closing Year 1 Balance Sheet</h3><table className="w-full text-left"><thead className="text-gray-500"><tr><th className="pb-2 font-normal">Account</th><th className="pb-2 text-right font-normal">Amount</th></tr></thead><tbody><tr className="border-b border-gray-200"><td className="py-2">Cash</td><td className="py-2 text-right font-mono">$8,090,531</td></tr><tr className="border-b border-gray-200"><td className="py-2">Goodwill</td><td className="py-2 text-right font-mono">$105,500,000</td></tr><tr className="border-b border-gray-200 text-gray-900 font-bold"><td className="py-2">Total Assets</td><td className="py-2 text-right font-mono">$114,399,531</td></tr><tr className="border-b border-gray-200"><td className="py-2">Liability to Bank</td><td className="py-2 text-right font-mono">$27,625,000</td></tr><tr className="text-gray-900 font-bold"><td className="pt-2">Net Equity</td><td className="pt-2 text-right font-mono">$86,765,531</td></tr></tbody></table></div><div className="space-y-6"><h3 className="text-2xl font-bold text-[#F97316] border-b border-gray-200 pb-2">Profitability</h3><table className="w-full text-left"><thead className="text-gray-500"><tr><th className="pb-2 font-normal">Metric</th><th className="pb-2 text-right font-normal">Amount</th></tr></thead><tbody><tr className="border-b border-gray-200"><td className="py-2">Profit Day 1-180</td><td className="py-2 text-right font-mono">$6,750,000</td></tr><tr className="border-b border-gray-200"><td className="py-2">Profit Day 180-365</td><td className="py-2 text-right font-mono">$9,500,000</td></tr><tr className="text-gray-900 font-bold"><td className="pt-2">First 12 months Profit</td><td className="pt-2 text-right font-mono">$16,250,000</td></tr></tbody></table></div></div></div>
                        </Section>
                        
                        <Section id="financials" className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 fade-in-up">Financial Summary</h2>
                            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16 fade-in-up" style={{ transitionDelay: '100ms' }}>A high-level overview of our financial projections, based on the initial scenario.</p>
                            <FinancialSummary />
                        </Section>
                        
                        <InteractiveFinancials />
                        
                        <Section id="team" className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <EditableText as="h2" contentKey="teamTitle" value={textContent.teamTitle} onSave={handleContentSave} className="text-4xl md:text-5xl font-bold fade-in-up inline-block" />
                                {isGlobalEditMode && (
                                    <button onClick={() => setIsTeamModalOpen(true)} className="ml-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors inline-block align-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {leadershipTeam.map((member, index) => (
                                <div key={member.id} className="text-center fade-in-up" style={{ transitionDelay: `${100 * (index + 1)}ms` }}><div className="w-28 h-28 bg-gray-200 border-2 border-gray-300 rounded-full mx-auto flex items-center justify-center mb-4"><span className="text-4xl text-gray-400 font-bold">{member.name.split(' ').map(n => n[0]).join('')}</span></div><h4 className="font-bold text-xl">{member.name}</h4><p className="text-md text-[#F97316] mb-2">{member.role}</p><p className="text-gray-600 max-w-xs mx-auto text-sm">{member.bio}</p></div>
                                ))}
                            </div>
                        </Section>

                        <Section id="swot-analysis" className="bg-gray-50 py-20">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <EditableText as="h2" contentKey="swotTitle" value={textContent.swotTitle} onSave={handleContentSave} className="text-4xl md:text-5xl font-bold text-center mb-16 fade-in-up" />
                                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                                    {swotData.map((swot, index) => (
                                        <SWOTAccordion key={index} title={swot.title} items={swot.items} forceOpen={forceSwotOpen} />
                                    ))}
                                </div>
                            </div>
                        </Section>

                        <Section id="image-gallery" className="container mx-auto px-4 sm:px-6 lg:px-8">
                             <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 fade-in-up">Image Gallery</h2>
                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {initialImageData.map((img, index) => (
                                    <div key={img.id} className="fade-in-up" style={{ transitionDelay: `${index * 50}ms` }}>
                                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" />
                                    </div>
                                ))}
                            </div>
                        </Section>
                        
                        <Section id="supporting-documents" className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <EditableText as="h2" contentKey="supportingDocsTitle" value={textContent.supportingDocsTitle} onSave={handleContentSave} className="text-4xl md:text-5xl font-bold fade-in-up inline-block" />
                                {isGlobalEditMode && (
                                    <button onClick={() => setIsDocsModalOpen(true)} className="ml-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors inline-block align-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                )}
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {supportingDocs.map(doc => (
                                    <div key={doc.id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm flex flex-col">
                                        <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4 flex-grow">{doc.description}</p>
                                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className={`mt-auto text-white text-center font-bold py-2 px-4 rounded-md transition-colors ${doc.url && doc.url !== '#' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'}`}>View Document</a>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    </main>
                    <footer className="border-t border-gray-200 mt-24">
                        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                            <p>Credit Appetite Paper &copy; 2025. All information is confidential.</p>
                        </div>
                    </footer>
                    <TimelineEditorModal isOpen={isTimelineModalOpen} onClose={() => setIsTimelineModalOpen(false)} onSave={handleSaveTimeline} data={timelineData} />
                    <TeamEditorModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} onSave={handleSaveTeam} data={leadershipTeam} />
                    <SupportingDocsEditorModal isOpen={isDocsModalOpen} onClose={() => setIsDocsModalOpen(false)} onSave={handleSaveDocs} data={supportingDocs} />
                </div>
            </div>
        </AppContext.Provider>
    );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);