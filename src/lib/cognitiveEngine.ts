
export interface CausalNode {
  id: string;
  decision: string;
  outcome: string;
  timestamp: number;
  synapticScore: number;
  causedBy: string[];
  causedNodes: string[];
  type: 'success' | 'failure' | 'insight' | 'delusion';
  complexity?: number;
  impactScore?: number;
  confidence?: number;
}

export interface CognitiveState {
  id: string;
  userId: string;
  worldModel: Record<string, any>;
  causalGraph: CausalNode[];
  biasProfile: Record<string, number>;
  synapticEfficiency: number;
  temporalAlignment: number;
  lastUpdated: number;
  totalProcessingTime?: number;
  emergentPatterns?: Array<{pattern: string; frequency: number; impact: number}>;
}

export interface ReasoningLayer {
  id: string;
  type: 'causal' | 'temporal' | 'synaptic' | 'reality';
  confidence: number;
  reasoning: string;
  dependencies: string[];
}

export class CognitiveEngine {
  private state: CognitiveState;
  
  constructor(userId: string) {
    this.state = {
      id: crypto.randomUUID(),
      userId,
      worldModel: {},
      causalGraph: [],
      biasProfile: {
        confirmationBias: 0.3,
        availabilityHeuristic: 0.4,
        anchoring: 0.35,
        optimismBias: 0.25,
        dunningKruger: 0.2,
        survivorshipBias: 0.15
      },
      synapticEfficiency: 0.5,
      temporalAlignment: 0.65,
      lastUpdated: Date.now(),
      totalProcessingTime: 0,
      emergentPatterns: []
    };
  }

  addCausalNode(decision: string, outcome: string, type: CausalNode['type']): CausalNode {
    const startTime = performance.now();
    
    const node: CausalNode = {
      id: crypto.randomUUID(),
      decision,
      outcome,
      timestamp: Date.now(),
      synapticScore: this.calculateSynapticScore(decision, outcome, type),
      causedBy: this.findCausalPredecessors(decision),
      causedNodes: [],
      type,
      complexity: this.calculateComplexity(decision, outcome),
      impactScore: this.calculateImpactScore(outcome, type),
      confidence: this.calculateConfidence(decision, outcome, type)
    };

    // Update causal relationships
    this.updateCausalRelationships(node);
    
    this.state.causalGraph.push(node);
    this.updateWorldModel(node);
    this.recalculateEfficiency();
    this.updateEmergentPatterns();
    
    const processingTime = performance.now() - startTime;
    this.state.totalProcessingTime = (this.state.totalProcessingTime || 0) + processingTime;
    
    return node;
  }

  private calculateComplexity(decision: string, outcome: string): number {
    const decisionWords = decision.split(' ').length;
    const outcomeWords = outcome.split(' ').length;
    const technicalTerms = this.countTechnicalTerms(decision + ' ' + outcome);
    
    return Math.min(1.0, (decisionWords + outcomeWords + technicalTerms * 2) / 50);
  }

  private calculateImpactScore(outcome: string, type: CausalNode['type']): number {
    const impactKeywords = ['increased', 'improved', 'enhanced', 'optimized', 'accelerated', 'solved'];
    const negativeKeywords = ['decreased', 'failed', 'slowed', 'blocked', 'error'];
    
    let score = 0.5;
    const lowerOutcome = outcome.toLowerCase();
    
    impactKeywords.forEach(keyword => {
      if (lowerOutcome.includes(keyword)) score += 0.1;
    });
    
    negativeKeywords.forEach(keyword => {
      if (lowerOutcome.includes(keyword)) score -= 0.1;
    });
    
    // Adjust based on node type
    switch (type) {
      case 'success': score += 0.2; break;
      case 'insight': score += 0.15; break;
      case 'failure': score -= 0.1; break;
      case 'delusion': score -= 0.2; break;
    }
    
    return Math.max(0, Math.min(1, score));
  }

  private calculateConfidence(decision: string, outcome: string, type: CausalNode['type']): number {
    const certaintyWords = ['definitely', 'certainly', 'clearly', 'obviously', 'precisely'];
    const uncertaintyWords = ['might', 'possibly', 'perhaps', 'maybe', 'approximately'];
    
    let confidence = 0.7; // Base confidence
    const text = (decision + ' ' + outcome).toLowerCase();
    
    certaintyWords.forEach(word => {
      if (text.includes(word)) confidence += 0.05;
    });
    
    uncertaintyWords.forEach(word => {
      if (text.includes(word)) confidence -= 0.05;
    });
    
    // Adjust based on type
    if (type === 'success' || type === 'insight') confidence += 0.1;
    if (type === 'delusion') confidence -= 0.2;
    
    return Math.max(0.1, Math.min(0.95, confidence));
  }

  private countTechnicalTerms(text: string): number {
    const technicalTerms = [
      'algorithm', 'optimization', 'implementation', 'integration', 'architecture',
      'framework', 'methodology', 'protocol', 'interface', 'system', 'process',
      'analysis', 'evaluation', 'performance', 'efficiency', 'scalability'
    ];
    
    const lowerText = text.toLowerCase();
    return technicalTerms.filter(term => lowerText.includes(term)).length;
  }

  private findCausalPredecessors(decision: string): string[] {
    const decisionWords = this.extractKeywords(decision.toLowerCase());
    const predecessors: string[] = [];
    
    // Look at recent nodes (last 10) for potential causal relationships
    const recentNodes = this.state.causalGraph.slice(-10);
    
    for (const node of recentNodes) {
      const nodeWords = this.extractKeywords(node.decision.toLowerCase());
      const commonWords = decisionWords.filter(word => nodeWords.includes(word));
      
      // If there's significant overlap and the node is recent enough
      if (commonWords.length >= 2 || (commonWords.length >= 1 && Date.now() - node.timestamp < 3600000)) {
        predecessors.push(node.id);
      }
    }
    
    return predecessors.slice(0, 3); // Limit to 3 most relevant predecessors
  }

  private updateCausalRelationships(newNode: CausalNode): void {
    // Update causedNodes for predecessor nodes
    for (const predecessorId of newNode.causedBy) {
      const predecessor = this.state.causalGraph.find(node => node.id === predecessorId);
      if (predecessor && !predecessor.causedNodes.includes(newNode.id)) {
        predecessor.causedNodes.push(newNode.id);
      }
    }
  }

  private extractKeywords(text: string): string[] {
    // Remove common words and extract meaningful terms
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    return text.split(' ')
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .slice(0, 10); // Limit to most important keywords
  }

  private calculateSynapticScore(decision: string, outcome: string, type: CausalNode['type']): number {
    // Enhanced scoring algorithm
    let baseScore = 0;
    switch (type) {
      case 'success': baseScore = 0.8 + (Math.random() * 0.15); break;
      case 'insight': baseScore = 0.7 + (Math.random() * 0.2); break;
      case 'failure': baseScore = 0.3 + (Math.random() * 0.3); break;
      case 'delusion': baseScore = 0.1 + (Math.random() * 0.2); break;
    }

    // Factor in decision complexity
    const complexityBonus = Math.min(0.1, decision.length / 1000);
    
    // Factor in outcome specificity and measurability
    const specificityBonus = Math.min(0.1, outcome.length / 500);
    const measurabilityBonus = this.hasMeasurableOutcome(outcome) ? 0.05 : 0;
    
    // Factor in historical context
    const contextBonus = this.calculateContextualRelevance(decision) * 0.1;
    
    return Math.min(1.0, baseScore + complexityBonus + specificityBonus + measurabilityBonus + contextBonus);
  }

  private hasMeasurableOutcome(outcome: string): boolean {
    const measurementIndicators = ['%', 'increased by', 'decreased by', 'improved by', 'reduced by', 'faster', 'slower', 'more', 'less'];
    const lowerOutcome = outcome.toLowerCase();
    return measurementIndicators.some(indicator => lowerOutcome.includes(indicator));
  }

  private calculateContextualRelevance(decision: string): number {
    // Calculate relevance based on similarity to existing successful decisions
    const successfulNodes = this.state.causalGraph.filter(node => node.type === 'success');
    if (successfulNodes.length === 0) return 0.5;
    
    const decisionWords = this.extractKeywords(decision.toLowerCase());
    let totalSimilarity = 0;
    
    for (const node of successfulNodes) {
      const nodeWords = this.extractKeywords(node.decision.toLowerCase());
      const commonWords = decisionWords.filter(word => nodeWords.includes(word));
      const similarity = commonWords.length / Math.max(decisionWords.length, nodeWords.length);
      totalSimilarity += similarity;
    }
    
    return totalSimilarity / successfulNodes.length;
  }

  private recalculateEfficiency(): void {
    if (this.state.causalGraph.length === 0) {
      this.state.synapticEfficiency = 0.5;
      return;
    }

    // Enhanced efficiency calculation
    const totalScore = this.state.causalGraph.reduce((sum, node) => sum + node.synapticScore, 0);
    const baseEfficiency = totalScore / this.state.causalGraph.length;
    
    // Factor in recency - recent nodes have more weight
    const recentNodes = this.state.causalGraph.filter(node => 
      Date.now() - node.timestamp < 3600000 // Last hour
    );
    
    let recentEfficiency = 0.5;
    if (recentNodes.length > 0) {
      const recentScore = recentNodes.reduce((sum, node) => sum + node.synapticScore, 0);
      recentEfficiency = recentScore / recentNodes.length;
    }
    
    // Weighted combination: 70% historical, 30% recent
    this.state.synapticEfficiency = (baseEfficiency * 0.7) + (recentEfficiency * 0.3);
    
    // Update temporal alignment
    this.updateTemporalAlignment();
    
    this.state.lastUpdated = Date.now();
  }

  private updateTemporalAlignment(): void {
    const recentNodes = this.state.causalGraph.filter(node => 
      Date.now() - node.timestamp < 3600000 // Last hour
    );
    
    if (recentNodes.length === 0) {
      this.state.temporalAlignment = 0.65; // Default
      return;
    }
    
    const successfulRecent = recentNodes.filter(n => n.type === 'success' || n.type === 'insight').length;
    const recentSuccessRate = successfulRecent / recentNodes.length;
    
    // Factor in learning from failures
    const failureNodes = recentNodes.filter(n => n.type === 'failure');
    const learningBonus = failureNodes.length > 0 ? 0.1 : 0;
    
    this.state.temporalAlignment = Math.min(0.95, 0.4 + (recentSuccessRate * 0.5) + learningBonus);
  }

  private updateWorldModel(node: CausalNode): void {
    // Enhanced world model updates
    this.state.worldModel[node.id] = {
      decision: node.decision,
      outcome: node.outcome,
      learnings: this.extractLearnings(node),
      connections: this.findConnections(node),
      patterns: this.identifyPatterns(node),
      riskFactors: this.identifyRiskFactors(node),
      opportunities: this.identifyOpportunities(node)
    };
    this.state.lastUpdated = Date.now();
  }

  private identifyPatterns(node: CausalNode): string[] {
    const patterns = [];
    
    // Identify decision patterns
    if (node.decision.toLowerCase().includes('implement')) {
      patterns.push('implementation-pattern');
    }
    if (node.decision.toLowerCase().includes('optimize')) {
      patterns.push('optimization-pattern');
    }
    if (node.type === 'success' && node.complexity && node.complexity > 0.7) {
      patterns.push('complex-success-pattern');
    }
    
    return patterns;
  }

  private identifyRiskFactors(node: CausalNode): string[] {
    const risks = [];
    
    if (node.type === 'failure' || node.type === 'delusion') {
      risks.push('historical-failure-risk');
    }
    if (node.confidence && node.confidence < 0.4) {
      risks.push('low-confidence-risk');
    }
    if (node.causedBy.length === 0) {
      risks.push('isolated-decision-risk');
    }
    
    return risks;
  }

  private identifyOpportunities(node: CausalNode): string[] {
    const opportunities = [];
    
    if (node.type === 'success' && node.impactScore && node.impactScore > 0.7) {
      opportunities.push('high-impact-replication');
    }
    if (node.type === 'insight') {
      opportunities.push('knowledge-application');
    }
    if (node.causedNodes.length > 2) {
      opportunities.push('decision-amplification');
    }
    
    return opportunities;
  }

  private extractLearnings(node: CausalNode): string[] {
    const learnings = [];
    
    switch (node.type) {
      case 'success':
        learnings.push('Successful pattern identified');
        if (node.complexity && node.complexity > 0.6) {
          learnings.push('Complex implementation succeeded');
        }
        break;
      case 'failure':
        learnings.push('Failure mode documented');
        learnings.push('Adaptation opportunity identified');
        break;
      case 'insight':
        learnings.push('New insight gained');
        learnings.push('Mental model updated');
        break;
      case 'delusion':
        learnings.push('False assumption detected');
        learnings.push('Reality calibration needed');
        break;
    }
    
    return learnings;
  }

  private findConnections(node: CausalNode): string[] {
    const connections = [];
    const nodeWords = this.extractKeywords(node.decision.toLowerCase());
    
    for (const existingNode of this.state.causalGraph) {
      if (existingNode.id === node.id) continue;
      
      const existingWords = this.extractKeywords(existingNode.decision.toLowerCase());
      const commonWords = nodeWords.filter(word => existingWords.includes(word) && word.length > 3);
      
      if (commonWords.length > 0) {
        connections.push(existingNode.id);
      }
    }
    
    return connections.slice(0, 5); // Limit connections
  }

  private updateEmergentPatterns(): void {
    this.state.emergentPatterns = this.getEmergentPatterns();
  }

  getEmergentPatterns(): Array<{pattern: string; frequency: number; impact: number}> {
    const patterns = new Map<string, {frequency: number; impact: number; confidence: number}>();
    
    this.state.causalGraph.forEach(node => {
      const pattern = this.extractPattern(node);
      const existing = patterns.get(pattern) || {frequency: 0, impact: 0, confidence: 0};
      patterns.set(pattern, {
        frequency: existing.frequency + 1,
        impact: existing.impact + (node.impactScore || node.synapticScore),
        confidence: existing.confidence + (node.confidence || 0.5)
      });
    });

    return Array.from(patterns.entries())
      .map(([pattern, data]) => ({
        pattern,
        frequency: data.frequency,
        impact: data.impact / data.frequency, // Average impact
        confidence: data.confidence / data.frequency // Average confidence
      }))
      .filter(p => p.frequency > 1 || p.impact > 0.7) // Only significant patterns
      .sort((a, b) => (b.frequency * b.impact) - (a.frequency * a.impact));
  }

  private extractPattern(node: CausalNode): string {
    const decisionType = node.type;
    const decisionTheme = this.categorizeDecision(node.decision);
    const complexityLevel = (node.complexity || 0.5) > 0.6 ? 'complex' : 'simple';
    
    return `${decisionType}:${decisionTheme}:${complexityLevel}`;
  }

  private categorizeDecision(decision: string): string {
    const lower = decision.toLowerCase();
    if (lower.includes('launch') || lower.includes('start') || lower.includes('begin')) return 'initiation';
    if (lower.includes('improve') || lower.includes('optimize') || lower.includes('enhance')) return 'optimization';
    if (lower.includes('fix') || lower.includes('solve') || lower.includes('debug')) return 'problem-solving';
    if (lower.includes('add') || lower.includes('implement') || lower.includes('create')) return 'development';
    if (lower.includes('test') || lower.includes('experiment') || lower.includes('try')) return 'experimentation';
    if (lower.includes('analyze') || lower.includes('research') || lower.includes('study')) return 'analysis';
    return 'general';
  }

  getCognitiveState(): CognitiveState {
    return { ...this.state };
  }

  // New methods for enhanced functionality
  getBiasAdjustedScore(node: CausalNode): number {
    let adjustedScore = node.synapticScore;
    
    // Apply bias corrections
    if (node.type === 'success') {
      adjustedScore *= (1 - this.state.biasProfile.optimismBias * 0.1);
    }
    if (node.type === 'failure') {
      adjustedScore *= (1 + this.state.biasProfile.optimismBias * 0.1);
    }
    
    return Math.max(0, Math.min(1, adjustedScore));
  }

  getTemporalDecay(node: CausalNode): number {
    const ageInHours = (Date.now() - node.timestamp) / (1000 * 60 * 60);
    return Math.exp(-ageInHours / 168); // Decay over a week
  }

  exportCognitiveSnapshot(): any {
    return {
      timestamp: Date.now(),
      state: this.getCognitiveState(),
      metrics: {
        totalNodes: this.state.causalGraph.length,
        averageScore: this.state.synapticEfficiency,
        processingTime: this.state.totalProcessingTime,
        patterns: this.state.emergentPatterns?.length || 0
      }
    };
  }
}
