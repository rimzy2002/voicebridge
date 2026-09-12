// ============================================================
// Day 30 Final Assessment & Transformation Engines
// ============================================================

import {
  FinalAssessment,
  FinalAssessmentSnapshot,
  SideBySideComparisonData,
  PersonalErrorPortfolioItem,
  PersonalPronunciationProfile,
  PersonalVocabularyReport,
  PersonalPhrasebook,
  PhrasebookFunction,
  PostProgramPlan,
  FinalReportData,
  LearnerTrack,
} from '@/types';

// ============================================================
// 1. Longitudinal Comparison Engine
// ============================================================

export interface ComparisonInput {
  day1Transcript?: string;
  day30Transcript?: string;
  day1DurationSeconds?: number;
  day30DurationSeconds?: number;
  day1StartDelaySeconds?: number;
  day30StartDelaySeconds?: number;
  day1Confidence?: number;
  day30Confidence?: number;
  selfAssessment?: {
    strongerRecording: 'day1' | 'day30' | 'similar';
    selectedChanges: string[];
    learnerNotes?: string;
  };
}

export function generateLongitudinalComparison(input: ComparisonInput): SideBySideComparisonData {
  const day1Dur = input.day1DurationSeconds || 45;
  const day30Dur = input.day30DurationSeconds || 92;
  const day1Delay = input.day1StartDelaySeconds || 7.5;
  const day30Delay = input.day30StartDelaySeconds || 2.4;
  const day1Conf = input.day1Confidence || 4.2;
  const day30Conf = input.day30Confidence || 8.8;

  const honestNotes: string[] = [];

  // Honest analysis notes
  if (day30Dur > day1Dur * 1.5) {
    honestNotes.push(
      `Your speaking duration expanded from ${day1Dur}s to ${day30Dur}s (+${Math.round(((day30Dur - day1Dur) / day1Dur) * 100)}%). Longer unscripted output naturally invites more cognitive processing, making your fluency gains particularly noteworthy.`
    );
  }
  if (day30Delay < day1Delay) {
    honestNotes.push(
      `Response-start latency dropped by ${(day1Delay - day30Delay).toFixed(1)}s, showing that internal translation hesitations have been replaced with direct retrieval.`
    );
  } else {
    honestNotes.push('Response-start delay remained steady, reflecting deliberate composure before speaking.');
  }

  return {
    day1Transcript: input.day1Transcript || 'Hello, my name is Alex. I am working as a software developer. Um, English is difficult for me because I translate in my head...',
    day30Transcript: input.day30Transcript || 'Good morning. Today I want to introduce my background and what drives my work. Over the past month, I have focused on structuring my thoughts clearly and delivering purposeful updates without hesitation...',
    metrics: {
      speakingDuration: { day1: day1Dur, day30: day30Dur, unit: 'seconds' },
      responseStartDelay: { day1: day1Delay, day30: day30Delay, unit: 'seconds' },
      longPausesCount: { day1: 5, day30: 1, unit: 'pauses (>3s)' },
      fillerRatePerMin: { day1: 11.2, day30: 3.1, unit: 'fillers/min' },
      structureScore: { day1: 3.8, day30: 8.9, unit: '/10' },
      vocabularyRange: { day1: 4.2, day30: 8.5, unit: '/10' },
      activeExpressionsUsed: { day1: 2, day30: 12, unit: 'chunks' },
      pronunciationClarity: { day1: 5.5, day30: 8.4, unit: '/10' },
      confidenceRating: { day1: day1Conf, day30: day30Conf, unit: '/10' },
    },
    selfAssessment: input.selfAssessment || {
      strongerRecording: 'day30',
      selectedChanges: [
        'I speak longer without running out of ideas',
        'I pause intentionally instead of saying "um"',
        'I organize ideas with clear structure',
        'I sound much clearer and more confident',
      ],
      learnerNotes: 'Hearing Day 1 right next to Day 30 is eye-opening. I sound like a completely different speaker.',
    },
    honestContextNotes: honestNotes,
  };
}

// ============================================================
// 2. 5-Checkpoint Progression Snapshots (Day 1 -> 7 -> 14 -> 21 -> 30)
// ============================================================

export function getProgressionSnapshots(): {
  day1: FinalAssessmentSnapshot;
  day7: FinalAssessmentSnapshot;
  day14: FinalAssessmentSnapshot;
  day21: FinalAssessmentSnapshot;
  day30: FinalAssessmentSnapshot;
} {
  return {
    day1: {
      dayNumber: 1,
      fluency: 4.2,
      ideaStructure: 3.5,
      conversation: 4.8,
      storytelling: 3.9,
      vocabulary: 4.0,
      grammarWhileSpeaking: 5.0,
      pronunciationClarity: 5.4,
      listening: 6.0,
      spontaneousSpeaking: 3.8,
      trackCommunication: 4.2,
      persuasion: 3.5,
      communicationRecovery: 4.0,
      independentPerformance: 3.2,
      confidenceBehavior: 4.0,
      overallScore: 42.5,
    },
    day7: {
      dayNumber: 7,
      fluency: 5.8,
      ideaStructure: 6.0,
      conversation: 6.2,
      storytelling: 5.7,
      vocabulary: 5.3,
      grammarWhileSpeaking: 5.8,
      pronunciationClarity: 6.2,
      listening: 6.8,
      spontaneousSpeaking: 5.5,
      trackCommunication: 5.6,
      persuasion: 5.0,
      communicationRecovery: 5.8,
      independentPerformance: 5.0,
      confidenceBehavior: 5.9,
      overallScore: 57.6,
    },
    day14: {
      dayNumber: 14,
      fluency: 7.2,
      ideaStructure: 7.5,
      conversation: 7.4,
      storytelling: 7.1,
      vocabulary: 6.9,
      grammarWhileSpeaking: 6.7,
      pronunciationClarity: 7.3,
      listening: 7.8,
      spontaneousSpeaking: 7.0,
      trackCommunication: 7.2,
      persuasion: 6.8,
      communicationRecovery: 7.4,
      independentPerformance: 6.8,
      confidenceBehavior: 7.5,
      overallScore: 72.1,
    },
    day21: {
      dayNumber: 21,
      fluency: 8.1,
      ideaStructure: 8.5,
      conversation: 8.3,
      storytelling: 8.0,
      vocabulary: 8.2,
      grammarWhileSpeaking: 7.6,
      pronunciationClarity: 8.0,
      listening: 8.5,
      spontaneousSpeaking: 8.0,
      trackCommunication: 8.6,
      persuasion: 7.9,
      communicationRecovery: 8.2,
      independentPerformance: 7.9,
      confidenceBehavior: 8.4,
      overallScore: 81.8,
    },
    day30: {
      dayNumber: 30,
      fluency: 8.9,
      ideaStructure: 9.1,
      conversation: 9.0,
      storytelling: 8.8,
      vocabulary: 8.9,
      grammarWhileSpeaking: 8.2,
      pronunciationClarity: 8.7,
      listening: 9.0,
      spontaneousSpeaking: 8.8,
      trackCommunication: 9.2,
      persuasion: 8.9,
      communicationRecovery: 9.0,
      independentPerformance: 9.1,
      confidenceBehavior: 9.2,
      overallScore: 89.2,
    },
  };
}

// ============================================================
// 3. Personal Phrasebook Engine (100 High-Value Chunks)
// ============================================================

export function generatePersonalPhrasebook(): PersonalPhrasebook {
  const categories: Record<PhrasebookFunction, { phrase: string; context: string; day: number; example: string }[]> = {
    Opinions: [
      { phrase: 'From my perspective', context: 'Stating viewpoints naturally', day: 2, example: 'From my perspective, this approach offers the best long-term stability.' },
      { phrase: 'The way I see it', context: 'Informal & conversational opinions', day: 8, example: 'The way I see it, we need to balance velocity with quality.' },
      { phrase: 'I would argue that', context: 'Strong professional reasoning', day: 26, example: 'I would argue that the initial investment will pay for itself within six months.' },
      { phrase: 'What matters most to me is', context: 'Highlighting core principles', day: 8, example: 'What matters most to me is keeping the user experience frictionless.' },
      { phrase: 'My impression is that', context: 'Diplomatic initial thoughts', day: 25, example: 'My impression is that the team is ready, but timing remains tight.' },
      { phrase: 'I am inclined to think', context: 'Nuanced consideration', day: 25, example: 'I am inclined to think that a phased rollout reduces organizational stress.' },
      { phrase: 'To be completely candid', context: 'Respectful directness', day: 19, example: 'To be completely candid, we cannot meet both deadlines simultaneously.' },
      { phrase: 'My fundamental belief is', context: 'Strategic alignment', day: 24, example: 'My fundamental belief is that communication transparency drives accountability.' },
    ],
    Explanations: [
      { phrase: 'To put it simply', context: 'Complexity reduction', day: 22, example: 'To put it simply, this script automates manual data reconciliations.' },
      { phrase: 'You can think of it as', context: 'Analogy framing', day: 22, example: 'You can think of it as a central dispatch center routing incoming requests.' },
      { phrase: 'The reason this matters is', context: 'Connecting cause and impact', day: 22, example: 'The reason this matters is because server downtime directly impacts sales.' },
      { phrase: 'How this works in practice is', context: 'Operational clarity', day: 22, example: 'How this works in practice is that changes sync automatically in the background.' },
      { phrase: 'The bottom line is', context: 'Executive summarization', day: 22, example: 'The bottom line is that we save four hours of manual work every week.' },
      { phrase: 'In technical terms... but basically', context: 'Jargon translation', day: 22, example: 'In technical terms it is an asynchronous queue, but basically it prevents bottlenecks.' },
      { phrase: 'What this means for us is', context: 'Team implication', day: 24, example: 'What this means for us is that we need to test thoroughly before Friday.' },
      { phrase: 'Let me break this down into three parts', context: 'Structural roadmap', day: 18, example: 'Let me break this down into three parts: context, findings, and next steps.' },
    ],
    Examples: [
      { phrase: 'A prime example of this would be', context: 'Concrete illustration', day: 3, example: 'A prime example of this would be our recent onboarding redesign.' },
      { phrase: 'To illustrate what I mean', context: 'Clarifying abstract ideas', day: 18, example: 'To illustrate what I mean, look at user engagement during week one.' },
      { phrase: 'In a real-world scenario', context: 'Practical application', day: 23, example: 'In a real-world scenario, users rarely read five paragraphs of text.' },
      { phrase: 'Take, for instance, the case of', context: 'Case study introduction', day: 18, example: 'Take, for instance, the case of our international customers last quarter.' },
      { phrase: 'A tangible demonstration of this is', context: 'Evidence presentation', day: 17, example: 'A tangible demonstration of this is our 20% drop in response times.' },
      { phrase: 'Specifically, what happened was', context: 'STAR situation anchoring', day: 17, example: 'Specifically, what happened was that an unexpected API outage occurred.' },
      { phrase: 'Consider how this applies to', context: 'Engaging the listener', day: 26, example: 'Consider how this applies to our junior team members joining next month.' },
      { phrase: 'An analogy that comes to mind is', context: 'Metaphorical anchoring', day: 22, example: 'An analogy that comes to mind is building the tracks while the train is moving.' },
    ],
    Agreement: [
      { phrase: 'I completely agree with that perspective', context: 'Full alignment', day: 8, example: 'I completely agree with that perspective; prioritizing stability is paramount.' },
      { phrase: 'That aligns closely with my thinking', context: 'Professional concurrence', day: 16, example: 'That aligns closely with my thinking regarding resource allocation.' },
      { phrase: 'You make a very compelling point', context: 'Respectful acknowledgment', day: 26, example: 'You make a very compelling point regarding customer retention.' },
      { phrase: 'I agree with the general direction', context: 'Qualified agreement', day: 25, example: 'I agree with the general direction, although the timeline may need adjustment.' },
      { phrase: 'That is consistent with what we observed', context: 'Data validation', day: 18, example: 'That is consistent with what we observed during beta testing.' },
      { phrase: 'I share your enthusiasm for this', context: 'Positive encouragement', day: 24, example: 'I share your enthusiasm for this initiative; let us outline the milestones.' },
      { phrase: 'We are on the exact same page regarding', context: 'Team consensus', day: 16, example: 'We are on the exact same page regarding our security standards.' },
      { phrase: 'I support that recommendation wholeheartedly', context: 'Executive backing', day: 23, example: 'I support that recommendation wholeheartedly.' },
    ],
    Disagreement: [
      { phrase: 'I see the reasoning behind that, but my concern is', context: 'Diplomatic pushback', day: 8, example: 'I see the reasoning behind that, but my concern is the maintenance cost.' },
      { phrase: 'I would challenge the assumption that', context: 'Debate inquiry', day: 26, example: 'I would challenge the assumption that users only care about price.' },
      { phrase: 'Another way to look at this might be', context: 'Alternative framing', day: 16, example: 'Another way to look at this might be focusing on retention rather than acquisition.' },
      { phrase: 'That may be true in some cases, however', context: 'Nuanced boundary', day: 25, example: 'That may be true in some cases, however our core cohort behaves differently.' },
      { phrase: 'I have some reservations regarding', context: 'Cautions without hostility', day: 25, example: 'I have some reservations regarding our current deployment timeline.' },
      { phrase: 'With all due respect, the evidence suggests', context: 'Evidence-based rebuttal', day: 26, example: 'With all due respect, the evidence suggests that churn is decreasing.' },
      { phrase: 'I agree with the goal, but differ on the execution', context: 'Constructive divergence', day: 19, example: 'I agree with the goal, but differ on how we should phase the rollout.' },
      { phrase: 'Let us pause and consider the potential downside', context: 'Strategic intervention', day: 24, example: 'Let us pause and consider the potential downside before locking this in.' },
    ],
    Clarification: [
      { phrase: 'Could you help me understand what you mean by', context: 'Non-defensive questioning', day: 6, example: 'Could you help me understand what you mean by "comprehensive review"?' },
      { phrase: 'Just to ensure we are aligned', context: 'Meeting verification', day: 16, example: 'Just to ensure we are aligned, are you suggesting we postpone the launch?' },
      { phrase: 'Are you asking about X, or are you focused on Y?', context: 'Multipart question triage', day: 27, example: 'Are you asking about the budget constraints, or the operational timeline?' },
      { phrase: 'When you say..., do you mean...?', context: 'Precision calibration', day: 27, example: 'When you say "immediate", do you mean by end of day or end of sprint?' },
      { phrase: 'Does that make sense so far?', context: 'Listener comprehension check', day: 22, example: 'Does that make sense so far, or should I walk through an example?' },
      { phrase: 'Let me rephrase that in another way', context: 'Communication rescue', day: 29, example: 'Let me rephrase that in another way to make the distinction crisper.' },
      { phrase: 'What I am hearing is... is that accurate?', context: 'Active listening reflection', day: 19, example: 'What I am hearing is that testing coverage is your top worry. Is that accurate?' },
      { phrase: 'Could you clarify the specific outcome you need?', context: 'Action alignment', day: 20, example: 'Could you clarify the specific outcome you need from this report?' },
    ],
    Meetings: [
      { phrase: 'The status is... progress includes... the blocker is...', context: '4-part meeting update', day: 16, example: 'The status is green; progress includes API integration; our only blocker is design approval.' },
      { phrase: 'Sorry to interrupt, but could I add a quick point?', context: 'Polite interruption', day: 16, example: 'Sorry to interrupt, but could I add a quick point regarding the database migration?' },
      { phrase: 'Before we move on, let us confirm the action item', context: 'Closing loops', day: 16, example: 'Before we move on, let us confirm who owns the stakeholder notification.' },
      { phrase: 'I would like to bring our focus back to', context: 'Steering discussions', day: 24, example: 'I would like to bring our focus back to our primary deliverable for this sprint.' },
      { phrase: 'What is the immediate priority for this week?', context: 'Goal clarification', day: 16, example: 'What is the immediate priority for the design team this week?' },
      { phrase: 'Let us divide ownership so nothing falls through', context: 'Delegation', day: 24, example: 'Let us divide ownership: Maria owns frontend, and I will handle API endpoints.' },
      { phrase: 'To summarize our agreement today', context: 'Executive recap', day: 20, example: 'To summarize our agreement, we will launch beta next Tuesday.' },
      { phrase: 'I will take responsibility for following up on', context: 'Accountability', day: 24, example: 'I will take responsibility for following up with the security auditor.' },
    ],
    Presentations: [
      { phrase: 'Today I want to walk you through three core insights', context: 'Signpost roadmap', day: 18, example: 'Today I want to walk you through three core insights from our pilot program.' },
      { phrase: 'Turning now to our performance data', context: 'Section transition', day: 18, example: 'Turning now to our performance data, you will notice a significant shift.' },
      { phrase: 'This graph illustrates a clear upward trend in', context: 'Data narration', day: 18, example: 'This graph illustrates a clear upward trend in weekly active users.' },
      { phrase: 'The data indicates X, which suggests Y', context: 'Fact vs inference distinction', day: 18, example: 'The data indicates a 15% bounce rate, which suggests our onboarding is too long.' },
      { phrase: 'What this means for our roadmap is', context: 'Strategic implication', day: 18, example: 'What this means for our roadmap is that we should invest in quick tutorials.' },
      { phrase: 'To conclude, our primary takeaway is', context: 'Presentation close', day: 18, example: 'To conclude, our primary takeaway is that quality drives conversion.' },
      { phrase: 'I would be happy to open the floor to questions', context: 'Q&A transition', day: 18, example: 'Thank you for listening; I would be happy to take your questions now.' },
      { phrase: 'That is an insightful question; let me address it', context: 'Q&A buffer', day: 27, example: 'That is an insightful question; let me address the architecture choices first.' },
    ],
    Interviews: [
      { phrase: 'To give you an overview of my journey', context: 'TMAY opening', day: 17, example: 'To give you an overview of my journey, I started in backend engineering...' },
      { phrase: 'The situation was... and my responsibility was...', context: 'STAR Situation & Task', day: 17, example: 'The situation was a severe latency spike, and my task was identifying the root cause.' },
      { phrase: 'The specific action I took was', context: 'STAR Action focus', day: 17, example: 'The specific action I took was rewriting the database indexing logic.' },
      { phrase: 'As a result, we achieved', context: 'STAR Quantified Result', day: 17, example: 'As a result, we reduced query time by 65% and prevented future outages.' },
      { phrase: 'What that experience taught me about leadership is', context: 'Reflection & growth', day: 17, example: 'What that experience taught me is the value of automated observability.' },
      { phrase: 'What attracts me to this opportunity specifically is', context: 'Motivation alignment', day: 17, example: 'What attracts me to this opportunity is your commitment to open-source tools.' },
      { phrase: 'One of my proudest professional accomplishments was', context: 'Highlight reel', day: 17, example: 'One of my proudest professional accomplishments was mentoring four junior engineers.' },
      { phrase: 'I approach high-pressure deadlines by first organizing', context: 'Behavioral structure', day: 17, example: 'I approach high-pressure deadlines by first categorizing tasks by dependencies.' },
    ],
    'Difficult Conversations': [
      { phrase: 'I noticed that... the impact was... moving forward', context: 'SBI Feedback Formula', day: 19, example: 'I noticed that yesterday\'s build broke; the impact was delayed QA; moving forward let us run checks locally.' },
      { phrase: 'I want to talk about how we can collaborate better', context: 'Constructive framing', day: 19, example: 'I want to talk about how we can collaborate better on shared deliverables.' },
      { phrase: 'I take full accountability for the oversight', context: 'Composed apology', day: 19, example: 'I take full accountability for the oversight; here is how we will prevent it.' },
      { phrase: 'My intention is not to assign blame, but to solve', context: 'De-escalation', day: 19, example: 'My intention is not to assign blame, but to solve the root bottleneck.' },
      { phrase: 'Help me understand what obstacles you encountered', context: 'Empathetic inquiry', day: 19, example: 'Help me understand what obstacles you encountered during the sprint.' },
      { phrase: 'This plan might benefit from reconsideration', context: 'Diplomatic hedging', day: 25, example: 'This plan might benefit from reconsideration before we commit budget.' },
      { phrase: 'I value our working relationship, which is why I am sharing this', context: 'Trust anchoring', day: 19, example: 'I value our working relationship, which is why I am sharing this observation openly.' },
      { phrase: 'Let us establish a concrete plan to get back on track', context: 'Forward recovery', day: 19, example: 'Let us establish a concrete plan to get back on track by next Monday.' },
    ],
    Negotiation: [
      { phrase: 'If we commit to X, would you be able to adjust Y?', context: 'Trade-off formulation', day: 20, example: 'If we commit to delivering the core features by Friday, could we push reporting to next week?' },
      { phrase: 'Let us explore a middle ground that protects quality', context: 'Collaborative compromise', day: 20, example: 'Let us explore a middle ground that protects quality without ballooning hours.' },
      { phrase: 'One alternative worth considering is', context: 'Option expansion', day: 20, example: 'One alternative worth considering is releasing an MVP to a smaller user group.' },
      { phrase: 'We want to support this, but with current bandwidth', context: 'Respectful boundary', day: 20, example: 'We want to support this, but with current bandwidth we would risk quality.' },
      { phrase: 'What if we divide the deliverable into two phases?', context: 'Phased agreement', day: 20, example: 'What if we divide the deliverable into two phases: MVP now, enhancements later?' },
      { phrase: 'Can we agree on the core requirements today?', context: 'Locking progress', day: 20, example: 'Can we agree on the core requirements today and refine edge cases later?' },
      { phrase: 'The main trade-off we face here is', context: 'Transparent constraints', day: 23, example: 'The main trade-off we face here is between speed to market and customizability.' },
      { phrase: 'Let us confirm the parameters of our agreement', context: 'Closing contract/terms', day: 20, example: 'Let us confirm the parameters: 10% scope reduction in exchange for on-time delivery.' },
    ],
    Conclusions: [
      { phrase: 'To wrap up our discussion today', context: 'Meeting / conversation wrap', day: 21, example: 'To wrap up our discussion today, our team has clear ownership for every item.' },
      { phrase: 'The key takeaway I want to leave you with is', context: 'Memorable ending', day: 18, example: 'The key takeaway is that clear communication builds faster execution.' },
      { phrase: 'In summary, our immediate next step is', context: 'Action alignment', day: 23, example: 'In summary, our immediate next step is submitting the revised proposal.' },
      { phrase: 'Looking ahead, we are well positioned to', context: 'Forward optimism', day: 24, example: 'Looking ahead, we are well positioned to scale our user base smoothly.' },
      { phrase: 'Thank you for your time and thoughtful input', context: 'Professional closing', day: 15, example: 'Thank you for your time and thoughtful input throughout this planning session.' },
      { phrase: 'Let us reconnect next week to review progress', context: 'Scheduled cadence', day: 16, example: 'Let us reconnect next week to review milestone progress.' },
      { phrase: 'All things considered, this represents our strongest path', context: 'Final recommendation', day: 23, example: 'All things considered, this represents our strongest path forward.' },
      { phrase: 'I am confident in our team\'s ability to deliver this', context: 'Leadership confidence', day: 24, example: 'I am confident in our team\'s ability to deliver this on schedule.' },
    ],
  };

  let totalItems = 0;
  const typedCategories: Record<PhrasebookFunction, import('@/types').PhrasebookItem[]> = {} as any;

  (Object.keys(categories) as PhrasebookFunction[]).forEach(categoryKey => {
    typedCategories[categoryKey] = categories[categoryKey].map((item, index) => {
      totalItems++;
      return {
        id: `pb-${categoryKey.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
        phrase: item.phrase,
        functionCategory: categoryKey,
        context: item.context,
        originalDay: item.day,
        exampleInContext: item.example,
        mastered: true,
      };
    });
  });

  return {
    totalItems,
    categories: typedCategories,
  };
}

// ============================================================
// 4. Personal Error Portfolio & Pronunciation Profile
// ============================================================

export function generatePersonalErrorPortfolio(): PersonalErrorPortfolioItem[] {
  return [
    {
      id: 'err-1',
      category: 'grammar',
      recurringPattern: 'Tense switching during spontaneous storytelling',
      exampleFromSpeech: '"Yesterday I go to the meeting and the manager was asking..."',
      betterVersion: '"Yesterday I went to the meeting and the manager asked..."',
      practiceSuggestion: 'Anchor your timeline before speaking: every past story requires simple past verbs throughout.',
    },
    {
      id: 'err-2',
      category: 'preposition',
      recurringPattern: 'Incorrect preposition with discussion topics',
      exampleFromSpeech: '"We need to discuss about the project schedule."',
      betterVersion: '"We need to discuss the project schedule." (or "talk about")',
      practiceSuggestion: 'Remember: "Discuss" takes a direct object without "about".',
    },
    {
      id: 'err-3',
      category: 'filler',
      recurringPattern: 'Holding tension with vocalized fillers ("um", "uh")',
      exampleFromSpeech: '"The plan is um... to start uh... on Tuesday."',
      betterVersion: '"The plan is [1-sec silent pause] to start on Tuesday."',
      practiceSuggestion: 'Replace vocal hesitation with an intentional silent inhale at clause boundaries.',
    },
    {
      id: 'err-4',
      category: 'structure',
      recurringPattern: 'Answering without leading with the bottom line',
      exampleFromSpeech: '"Because of many issues with the server and code changes, we delayed."',
      betterVersion: '"We delayed the launch by two days. The root cause was unexpected server latency."',
      practiceSuggestion: 'State your Point or Result first, then provide supporting context and reasons.',
    },
  ];
}

export function generatePersonalPronunciationProfile(): PersonalPronunciationProfile {
  return {
    strong: [
      'Vowel length distinction (ship vs sheep)',
      'Sentence-level falling intonation on declarative statements',
      'Word stress in 2-syllable common nouns vs verbs',
    ],
    developing: [
      'Thought-chunking in long compound sentences',
      'Rhythmic contrast between stressed content words and unstressed function words',
    ],
    priority: [
      'Crisp articulation of final consonant clusters (-ed, -ts, -kt)',
      'Intentional pause placement instead of running out of breath',
    ],
    intelligibilityScore: 8.7,
    rhythmAndChunking: 8.4,
    pausePlacement: 8.9,
  };
}

export function generatePersonalVocabularyReport(): PersonalVocabularyReport {
  return {
    expressionsDiscovered: 142,
    practicingCount: 28,
    activeCount: 96,
    mostUsedExpressions: [
      'From my perspective',
      'The reason this matters is',
      'You can think of it as',
      'What matters most is',
      'If we commit to X, could we adjust Y?',
      'The bottom line is',
    ],
    needingRecycling: [
      'With all due respect',
      'In a real-world scenario',
      'I have some reservations regarding',
      'To put it simply',
    ],
  };
}

// ============================================================
// 5. Post-Program Continuation Plan Engine (30–90 Days)
// ============================================================

export function generatePostProgramPlan(track: LearnerTrack = 'general', continuationGoal?: string): PostProgramPlan {
  const primaryGoal = continuationGoal || (track === 'professional' ? 'Executive meetings and client negotiations' : 'Spontaneous discussion and articulate explanations');

  return {
    primaryGoal,
    secondaryGoal: 'Maintaining natural speaking habit without returning to internal mental translation',
    recommendedWeeklySchedule: {
      speakingSessionsPerWeek: 3,
      listeningSessionsPerWeek: 2,
      trackSimulationsPerWeek: 1,
      vocabularyRecyclingPerWeek: 1,
      checkpointsPerWeek: 1,
    },
    phase1_Next30Days: [
      'Maintain daily 10-minute unscripted speaking drills on unexpected prompts',
      'Actively use 2 phrasebook chunks in every real-world English interaction',
      'Practice 2-minute audio summaries after listening to English podcasts or talks',
      'Keep vocal filler count below 3 per minute by using deliberate silent pauses',
    ],
    phase2_Days31To60: [
      'Target remaining priority: crisp final consonant articulation in spontaneous speech',
      'Simulate 1 high-stakes presentation or meeting scenario per week',
      'Execute SBI feedback and diplomatic disagreement in workplace/study conversations',
      'Record and audit a 3-minute unscripted reflection bi-weekly',
    ],
    phase3_Days61To90: [
      'Increase conversational complexity: participate actively in international forums or group discussions',
      'Transition from learner to mentor: lead meetings and facilitate collaborative decisions',
      'Complete the 15-Minute Real-World Mission monthly to benchmark continued growth',
      'Expand active vocabulary by reading technical/industry commentary and adopting 3 new chunks weekly',
    ],
    realWorldContinuationGoal: primaryGoal,
    nextReviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

// ============================================================
// 6. Final Comprehensive Report Engine
// ============================================================

export function generateComprehensiveFinalReport(options: {
  track?: LearnerTrack;
  learnerName?: string;
  comparisonInput?: ComparisonInput;
  reflectionAnswers?: Record<string, string>;
}): FinalReportData {
  const track = options.track || 'general';
  const comparison = generateLongitudinalComparison(options.comparisonInput || {});
  const snapshots = getProgressionSnapshots();
  const phrasebook = generatePersonalPhrasebook();
  const errorPortfolio = generatePersonalErrorPortfolio();
  const pronunciationProfile = generatePersonalPronunciationProfile();
  const vocabularyReport = generatePersonalVocabularyReport();
  const continuationPlan = generatePostProgramPlan(track);

  const reflection = {
    whatChangedMost: options.reflectionAnswers?.whatChangedMost || 'I no longer freeze or mentally translate before speaking. I can structure long answers on the fly.',
    mostHelpfulActivity: options.reflectionAnswers?.mostHelpfulActivity || 'The PREP technique and high-pressure tough question simulations.',
    hardestProblem: options.reflectionAnswers?.hardestProblem || 'Stopping habitual "um" fillers and speaking at a measured pace.',
    newCapability: options.reflectionAnswers?.newCapability || 'Leading a meeting update and negotiating trade-offs comfortably in English.',
    outsideUsage: options.reflectionAnswers?.outsideUsage || 'Participated actively in team standups and delivered a project walkthrough.',
    futureFocus: options.reflectionAnswers?.futureFocus || 'Maintaining consistent past-tense accuracy during long, complex stories.',
    finalConfidenceRating: Number(options.reflectionAnswers?.finalConfidenceRating) || 9,
  };

  const finalAssessment: FinalAssessment = {
    learnerId: 'user-current',
    snapshots,
    sideBySideComparison: comparison,
    strongestImprovement: {
      dimension: 'Spontaneous Structure & Fluency',
      evidence: 'Speaking duration doubled (45s -> 92s) while response-start latency dropped from 7.5s to 2.4s and filler rate plummeted by 72%.',
      baselineValue: '45s / 11 fillers per min',
      finalValue: '92s / 3.1 fillers per min',
    },
    secondaryImprovements: [
      'Audience-Calibrated Vocabulary: actively deployed 96+ lexical chunks across meetings, negotiations, and presentations.',
      'Composure Under Pressure: buffered unexpected pushback and answered tough questions using structured pauses rather than nervous fillers.',
    ],
    mainContinuingPriority: {
      area: 'Grammar Consistency in Spontaneous Past-Tense Narratives',
      evidence: 'Occasional tense slippage observed in 3+ minute unassisted stories when cognitive load peaked.',
      recommendedAction: 'Anchor story timeline before speaking; mentally lock all verbs to simple past ("We noticed", "The client requested").',
    },
    overallProgramScore: 89.2,
    completedAt: new Date().toISOString(),
  };

  return {
    learnerName: options.learnerName || 'Learner',
    track,
    completedDays: 30,
    speakingDays: 30,
    totalSpeakingMinutes: 480,
    recordingsCompleted: 114,
    conversationsHeld: 26,
    presentationsGiven: 14,
    storiesTold: 18,
    simulationsCompleted: 22,
    listeningActivitiesCompleted: 35,
    realWorldMissionsCompleted: 30,
    vocabularyActivatedCount: 96,
    longestResponseSeconds: 240,
    streakDays: 30,
    earnedXp: 3450,
    assessment: finalAssessment,
    phrasebook,
    errorPortfolio,
    pronunciationProfile,
    vocabularyReport,
    continuationPlan,
    finalReflection: reflection,
  };
}
