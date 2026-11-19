// Process definition. Edit this file to adapt the roadmap to a new integration.
// NODES must be listed so that every step appears after the steps it depends on.
const TEAMS = {
  'PM':    { n: 'Product Manager', c: 'var(--t-pm)' },
  'ENG-PY':{ n: 'Python specialist', c: 'var(--t-py)' },
  'ENG-TS':{ n: 'TypeScript specialist', c: 'var(--t-ts)' },
  'MGR':   { n: 'Senior Manager', c: 'var(--t-mgr)' },
  'MKT':   { n: 'Marketing (any function)', c: 'var(--t-mkt)' },
  'GTM':   { n: 'Go-to-market, coordinates with partners', c: 'var(--t-gtm)' },
  'ENG-PA':{ n: 'Engineer from a partner', c: 'var(--t-pa)' },
  'BR':    { n: 'Build Relations', c: 'var(--t-br)' }
};

// teams: first entry leads. est: conservative weeks. deps listed by id.
const NODES = [
  { id:'S1',  name:'Kickoff and PD review', phase:'Intake', teams:['PM','MGR','ENG-PY','ENG-TS'], est:1, deps:[],
    features:['Confirm the PD (product description) is complete enough to plan against','Assign a risk tier that sets the depth of later security work','Name a security champion for Python and for TypeScript','Record t0'],
    asset:'PD', note:'Entry condition: a PD or an SCP exists.' },
  { id:'S2',  name:'Scope definition', phase:'Define', teams:['PM','ENG-PY','ENG-TS'], est:3, deps:['S1'],
    features:['Write the SCP: requirements at a lower level than the PD','Add security requirements and data classification','Acceptance criteria that include security checks','Decide whether DES is needed'],
    asset:'SCP' },
  { id:'S5',  name:'Partner scoping', phase:'Define', teams:['GTM','ENG-PA','PM'], est:4, deps:['S1'],
    features:['Identify partner and integration surface','Collect partner security attestations','Agree responsibilities and agreements','Name the partner engineer'],
    note:'Contracts are the usual source of delay, so the estimate is long.' },
  { id:'S6',  name:'Messaging and positioning', phase:'Define', teams:['MKT','PM'], est:3, deps:['S1'],
    features:['Positioning, naming and audience','Review security claims against real controls','Draft announcement outline'] },
  { id:'S3',  name:'Threat model and security requirements', phase:'Plan', teams:['ENG-PY','ENG-TS'], est:2, deps:['S2'],
    features:['Threat model and abuse cases','Authentication, secrets and data-handling requirements','Dependency and licence policy check','Security test plan'] },
  { id:'S4',  name:'Design review', phase:'Plan', teams:['ENG-PY','ENG-TS','PM'], est:3, deps:['S2'], optional:true,
    features:['Architecture and API design','Security design review by specialists','Specialist sign-off on DES'],
    asset:'DES', note:'Skip when the design is simple and no specialist sign-off is needed.' },
  { id:'S12', name:'Co-marketing and launch plan', phase:'Plan', teams:['GTM','MKT','ENG-PA'], est:3, deps:['S5','S6'],
    features:['Joint announcement plan with the partner','Launch calendar and channels','Approvals from partner communications'] },
  { id:'S7',  name:'Resourcing gate (tStart)', phase:'Gate', teams:['MGR','PM'], est:1, deps:['S3','S4'],
    features:['Approve SCP and DES','Confirm staffing for Python, TypeScript and partner work','Set targets for tEnd and tLaunch','Go or no-go for engineering'],
    note:'Marks tStart when the step ends.' },
  { id:'S8',  name:'Build: Python', phase:'Build', teams:['ENG-PY'], est:8, deps:['S7'],
    features:['Secure coding standard and peer review','Unit tests, with static analysis in CI','Pinned dependencies and vulnerability scanning','No secrets in source'] },
  { id:'S9',  name:'Build: TypeScript', phase:'Build', teams:['ENG-TS'], est:8, deps:['S7'],
    features:['Secure coding standard and peer review','Unit tests, with static analysis in CI','Pinned dependencies and vulnerability scanning','No secrets in source'] },
  { id:'S10', name:'Build: partner integration', phase:'Build', teams:['ENG-PA','ENG-PY','ENG-TS'], est:6, deps:['S7','S5'],
    features:['Shared API contract tests','Credential and token handling reviewed','Partner code scanned with the same tools'] },
  { id:'S11', name:'Developer docs and samples', phase:'Build', teams:['BR','ENG-PY','ENG-TS'], est:6, deps:['S7'],
    features:['Tutorials and sample code','Security guidance for users','Release notes draft'] },
  { id:'S13', name:'Security verification', phase:'Verify', teams:['ENG-PY','ENG-TS'], est:3, deps:['S8','S9'],
    features:['SBOM and dependency review','Secret scanning and static analysis results triaged','Fuzzing and penetration test','Fix all critical and high findings'] },
  { id:'S15', name:'Community enablement', phase:'Verify', teams:['BR'], est:2, deps:['S6','S11'],
    features:['Office hours and forum prepared','Support runbook','Feedback loop to PM'] },
  { id:'S14', name:'Integration and partner validation (tEnd)', phase:'Verify', teams:['ENG-PA','ENG-PY','ENG-TS'], est:2, deps:['S10','S13'],
    features:['End-to-end tests across languages and the partner','Partner confirms acceptance','Engineering complete'],
    note:'Marks tEnd when the step ends.' },
  { id:'S16', name:'LRA assembly', phase:'Ready', teams:['PM','ENG-PY','ENG-TS'], est:1, deps:['S14','S12'],
    features:['PM owns the LRA','Engineers write the technical sections','Security findings and their status','Open risks and mitigations'],
    asset:'LRA' },
  { id:'S18', name:'Partner launch confirmation', phase:'Ready', teams:['GTM','ENG-PA'], est:1, deps:['S14'],
    features:['Partner confirms date and messaging','Partner support path confirmed'] },
  { id:'S17', name:'LRA sign-off', phase:'Ready', teams:['MGR'], est:1, deps:['S16'],
    features:['Senior manager reviews the LRA','Sign-off, or a list of blockers'], asset:'LRA' },
  { id:'S19', name:'Launch (tLaunch)', phase:'Launch', teams:['PM','MKT','GTM','BR','MGR'], est:1, deps:['S17','S15','S18','S12'],
    features:['Announce the product','Docs, samples and community channels go live','Partner announcement goes out'],
    note:'Marks tLaunch when the step ends.' },
  { id:'S20', name:'Post-launch monitoring', phase:'Operate', teams:['ENG-PY','ENG-TS','MGR','BR'], est:4, deps:['S19'],
    features:['Vulnerability intake and patch targets','Dependency updates','Retrospective and process feedback'] }
];
const ASSETS = [
  { k:'PD', name:'Product description', owner:'PM', authors:'PM', sign:'None', step:'S1' },
  { k:'SCP', name:'Scope, lower-level requirements', owner:'PM', authors:'PM with ENG-PY and ENG-TS', sign:'MGR at the resourcing gate', step:'S2' },
  { k:'DES', name:'Design (optional)', owner:'ENG', authors:'ENG-PY and ENG-TS', sign:'Specialists, when design is complex', step:'S4' },
  { k:'LRA', name:'Launch Readiness Assessment', owner:'PM', authors:'PM; technical sections by ENG', sign:'MGR', step:'S16' }
];
const PHASE = { 0:'Intake',1:'Define',2:'Plan',3:'Gate',4:'Build',5:'Verify',6:'Verify',7:'Ready',8:'Ready',9:'Launch',10:'Operate' };


window.PROCESS = { TEAMS, NODES, ASSETS, PHASE };
