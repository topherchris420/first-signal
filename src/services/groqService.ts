
const GROQ_API_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

export class GroqService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async compress(complexGoal: string): Promise<string> {
    const response = await this.makeRequest([
      {
        role: 'system',
        content: `You are a reality compression engine. Extract the irreducible kernel of any complex goal. Remove all fluff, assumptions, and unnecessary complexity. Return only the essential core that cannot be reduced further.`
      },
      {
        role: 'user',
        content: `Compress this goal to its irreducible kernel: ${complexGoal}`
      }
    ]);

    return response.choices[0].message.content;
  }

  async expand(kernel: string): Promise<string> {
    const response = await this.makeRequest([
      {
        role: 'system',
        content: `You are a first principles expansion engine. Take an irreducible goal kernel and expand it using first principles scaffolding. Show the logical building blocks needed to achieve this goal.`
      },
      {
        role: 'user',
        content: `Expand this kernel using first principles: ${kernel}`
      }
    ]);

    return response.choices[0].message.content;
  }

  async simulateDelusion(assumption: string, timeHorizon: string): Promise<Array<{step: number; outcome: string; decay: number}>> {
    const response = await this.makeRequest([
      {
        role: 'system',
        content: `You are a delusion decay simulator. Given a false foundational assumption, simulate how decisions based on it will decay over time. Return a JSON array of decay steps with outcomes and decay scores (0-1).`
      },
      {
        role: 'user',
        content: `Simulate the decay of decisions based on this false assumption over ${timeHorizon}: ${assumption}`
      }
    ]);

    try {
      return JSON.parse(response.choices[0].message.content);
    } catch {
      // Fallback if JSON parsing fails
      return [
        { step: 1, outcome: "Initial false confidence", decay: 0.1 },
        { step: 2, outcome: "Reality friction increases", decay: 0.3 },
        { step: 3, outcome: "Cognitive dissonance peaks", decay: 0.6 },
        { step: 4, outcome: "System collapse imminent", decay: 0.9 }
      ];
    }
  }

  async mirrorDialogue(userMessage: string, biasProfile: Record<string, number>): Promise<string> {
    const biasContext = Object.entries(biasProfile)
      .map(([bias, strength]) => `${bias}: ${strength}`)
      .join(', ');

    const response = await this.makeRequest([
      {
        role: 'system',
        content: `You are a cognitive mirror. Respond as a version of the user with their exact cognitive biases amplified. Use these bias patterns: ${biasContext}. Surface their blind spots through dialogue.`
      },
      {
        role: 'user',
        content: userMessage
      }
    ]);

    return response.choices[0].message.content;
  }

  async checkTemporalAlignment(decision: string): Promise<{alignment: number; obsolescenceRisk: number; scalingGaps: string[]}> {
    const response = await this.makeRequest([
      {
        role: 'system',
        content: `You are a temporal alignment checker for an AGI-saturated future. Analyze decisions for obsolescence risk and under-scaling. Return JSON with alignment score (0-1), obsolescence risk (0-1), and scaling gaps array.`
      },
      {
        role: 'user',
        content: `Check this decision's temporal alignment: ${decision}`
      }
    ]);

    try {
      return JSON.parse(response.choices[0].message.content);
    } catch {
      return {
        alignment: Math.random(),
        obsolescenceRisk: Math.random(),
        scalingGaps: ["Human-scale thinking", "Linear assumptions", "Static worldview"]
      };
    }
  }

  private async makeRequest(messages: Array<{role: string; content: string}>): Promise<GroqResponse> {
    const response = await fetch(GROQ_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    return response.json();
  }
}
