
export interface CausalNode {
  id: string;
  decision: string;
  outcome: string;
  timestamp: number;
  synapticScore: number;
  causedBy: string[];
  causedNodes: string[];
  type: 'success' | 'failure' | 'insight' | 'delusion';
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
        optimismBias: 0.25
      },
      synapticEfficiency: 0.5,
      temporalAlignment: 0.65,
      lastUpdated: Date.now()
    };
  }

  addCausalNode(decision: string, outcome: string, type: CausalNode['type']): CausalNode {
    const node: CausalNode = {
      id: crypto.randomUUID(),
      decision,
      outcome,
      timestamp: Date.now(),
      synapticScore: this.calculateSynapticScore(decision, outcome, type),
      causedBy: [],
      causedNodes: [],
      type
    };

    this.state.causalGraph.push(node);
    this.updateWorldModel(node);
    this.recalculateEfficiency();
    return node;
  }

  private calculateSynapticScore(decision: string, outcome: string, type: CausalNode['type']): number {
    // Base scoring based on node type
    let baseScore = 0;
    switch (type) {
      case 'success': baseScore = 0.8 + (Math.random() * 0.15); break;
      case 'insight': baseScore = 0.7 + (Math.random() * 0.2); break;
      case 'failure': baseScore = 0.3 + (Math.random() * 0.3); break;
      case 'delusion': baseScore = 0.1 + (Math.random() * 0.2); break;
    }

    // Factor in decision complexity (longer decisions tend to be more thoughtful)
    const complexityBonus = Math.min(0.1, decision.length / 1000);
    
    // Factor in outcome specificity
    const specificityBonus = Math.min(0.1, outcome.length / 500);
    
    return Math.min(1.0, baseScore + complexityBonus + specificityBonus);
  }

  private recalculateEfficiency(): void {
    if (this.state.causalGraph.length === 0) {
      this.state.synapticEfficiency = 0.5;
      return;
    }

    // Calculate efficiency based on actual node scores
    const totalScore = this.state.causalGraph.reduce((sum, node) => sum + node.synapticScore, 0);
    this.state.synapticEfficiency = totalScore / this.state.causalGraph.length;

    // Update temporal alignment based on recent activity
    const recentNodes = this.state.causalGraph.filter(node => 
      Date.now() - node.timestamp < 3600000 // Last hour
    );
    
    if (recentNodes.length > 0) {
      const recentSuccessRate = recentNodes.filter(n => n.type === 'success' || n.type === 'insight').length / recentNodes.length;
      this.state.temporalAlignment = Math.min(0.95, 0.4 + (recentSuccessRate * 0.5));
    }

    this.state.lastUpdated = Date.now();
  }

  private updateWorldModel(node: CausalNode): void {
    // Update world model based on new causal node
    this.state.worldModel[node.id] = {
      decision: node.decision,
      outcome: node.outcome,
      learnings: this.extractLearnings(node),
      connections: this.findConnections(node)
    };
    this.state.lastUpdated = Date.now();
  }

  private extractLearnings(node: CausalNode): string[] {
    // Simple learning extraction based on node type
    const learnings = [];
    if (node.type === 'success') {
      learnings.push('Successful pattern identified');
    } else if (node.type === 'failure') {
      learnings.push('Failure mode documented');
    } else if (node.type === 'insight') {
      learnings.push('New insight gained');
    }
    return learnings;
  }

  private findConnections(node: CausalNode): string[] {
    // Find connections to existing nodes based on similar keywords
    const connections = [];
    const nodeWords = node.decision.toLowerCase().split(' ');
    
    for (const existingNode of this.state.causalGraph) {
      if (existingNode.id === node.id) continue;
      
      const existingWords = existingNode.decision.toLowerCase().split(' ');
      const commonWords = nodeWords.filter(word => existingWords.includes(word) && word.length > 3);
      
      if (commonWords.length > 0) {
        connections.push(existingNode.id);
      }
    }
    
    return connections.slice(0, 3); // Limit connections
  }

  getEmergentPatterns(): Array<{pattern: string; frequency: number; impact: number}> {
    // Analyze causal graph for recurring patterns
    const patterns = new Map<string, {frequency: number; impact: number}>();
    
    this.state.causalGraph.forEach(node => {
      const pattern = this.extractPattern(node);
      const existing = patterns.get(pattern) || {frequency: 0, impact: 0};
      patterns.set(pattern, {
        frequency: existing.frequency + 1,
        impact: existing.impact + node.synapticScore
      });
    });

    return Array.from(patterns.entries()).map(([pattern, data]) => ({
      pattern,
      frequency: data.frequency,
      impact: data.impact / data.frequency // Average impact
    })).sort((a, b) => b.frequency - a.frequency);
  }

  private extractPattern(node: CausalNode): string {
    // Enhanced pattern extraction
    const decisionType = node.type;
    const decisionTheme = this.categorizeDecision(node.decision);
    return `${decisionType}:${decisionTheme}`;
  }

  private categorizeDecision(decision: string): string {
    const lower = decision.toLowerCase();
    if (lower.includes('launch') || lower.includes('start')) return 'initiation';
    if (lower.includes('improve') || lower.includes('optimize')) return 'optimization';
    if (lower.includes('fix') || lower.includes('solve')) return 'problem-solving';
    if (lower.includes('add') || lower.includes('implement')) return 'development';
    return 'general';
  }

  getCognitiveState(): CognitiveState {
    return { ...this.state };
  }
}
