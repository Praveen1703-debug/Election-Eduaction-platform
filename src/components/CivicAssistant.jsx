import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  UserPlus, 
  FileText, 
  Megaphone, 
  Vote, 
  Trophy,
  HelpCircle,
  Clock
} from 'lucide-react';

const electionSteps = [
  {
    id: 1,
    title: 'Voter Registration',
    description: 'The foundation of democracy. Citizens must register to be included in the electoral roll.',
    icon: UserPlus,
    details: [
      'Fill Form 6 on the NVSP portal or Voter Helpline App.',
      'Provide proof of age and residence.',
      'Voter ID (EPIC) card is issued after verification.',
      'Check your name in the electoral roll regularly.'
    ],
    timeline: 'Continuous (stops shortly before elections)'
  },
  {
    id: 2,
    title: 'Nomination of Candidates',
    description: 'Individuals or party representatives file their candidacy for specific constituencies.',
    icon: FileText,
    details: [
      'Candidates file nomination papers with the Returning Officer.',
      'Security deposit must be paid.',
      'Affidavits declaring assets, liabilities, and criminal record (if any) are mandatory.',
      'Scrutiny of nominations follows filing.'
    ],
    timeline: 'Starting from the date of Notification'
  },
  {
    id: 3,
    title: 'Election Campaigning',
    description: 'Parties and candidates share their vision and manifesto with the public.',
    icon: Megaphone,
    details: [
      'Model Code of Conduct (MCC) comes into force.',
      'Public rallies, door-to-door visits, and digital campaigning.',
      'Manifestos are released outlining future plans.',
      'Campaigning must stop 48 hours before polling ends.'
    ],
    timeline: 'Between nomination and 48 hours before poll'
  },
  {
    id: 4,
    title: 'The Polling Day',
    description: 'The moment of choice. Citizens cast their secret ballots at designated booths.',
    icon: Vote,
    details: [
      'Electronic Voting Machines (EVMs) and VVPATs are used.',
      'Verification of Voter ID at the booth.',
      'Indelible ink is applied to the finger.',
      'Security personnel ensure a peaceful environment.'
    ],
    timeline: 'Scheduled by the Election Commission'
  },
  {
    id: 5,
    title: 'Counting & Declaration',
    description: 'The final phase where votes are tallied and representatives are chosen.',
    icon: Trophy,
    details: [
      'Strong rooms are opened in the presence of observers.',
      'Round-by-round counting of EVM votes.',
      'Verification of VVPAT slips in selected booths.',
      'Winning candidate is officially certified.'
    ],
    timeline: 'Usually a few days after the final polling phase'
  }
];

export default function CivicAssistant() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < electionSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const activeStep = electionSteps[currentStep];
  const StepIcon = activeStep.icon;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary-500" />
          Democracy Guide
        </h1>
        <p className="text-slate-500 mt-2">
          An interactive walkthrough of the Indian electoral journey, from registration to results.
        </p>
      </header>

      {/* Progress Stepper */}
      <div className="glass-panel p-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px]">
          {electionSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button 
                onClick={() => setCurrentStep(index)}
                className="flex flex-col items-center group relative"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-100 dark:bg-dark-bg text-slate-400'
                }`}>
                  {index < currentStep ? <CheckCircle2 className="w-6 h-6" /> : <span>{step.id}</span>}
                </div>
                <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider transition-colors ${
                  index === currentStep ? 'text-primary-600' : 'text-slate-400'
                }`}>
                  {step.title.split(' ')[0]}
                </span>
              </button>
              {index < electionSteps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-500 ${
                  index < currentStep ? 'bg-primary-600' : 'bg-slate-200 dark:bg-dark-border'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div className="glass-panel p-8 relative overflow-hidden min-h-[400px] flex flex-col">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/5 rounded-bl-full -mr-12 -mt-12" />
        
        <div className="flex items-start gap-6 relative z-10 mb-8">
          <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl text-primary-600">
            <StepIcon className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activeStep.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-xl">{activeStep.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 relative z-10">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4" /> Timeline
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{activeStep.timeline}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Key Steps</h3>
            <ul className="space-y-3">
              {activeStep.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex justify-between items-center border-t border-slate-200 dark:border-dark-border pt-6">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              currentStep === 0 
                ? 'opacity-30 cursor-not-allowed' 
                : 'hover:bg-slate-100 dark:hover:bg-dark-surface-hover text-slate-600 dark:text-slate-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          
          <span className="text-sm font-mono text-slate-400">
            Step {currentStep + 1} of {electionSteps.length}
          </span>

          {currentStep < electionSteps.length - 1 ? (
            <button 
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium shadow-lg shadow-primary-500/20 transition-all"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={() => setCurrentStep(0)}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-lg shadow-green-500/20 transition-all"
            >
              Start Over <Trophy className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
