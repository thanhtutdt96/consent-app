interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionError extends Event {
  error: SpeechRecognitionErrorCode;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  onaudiostart?: ((this: SpeechRecognitionEventMap, event: Event) => any) | null;
  onaudioend?: ((this: SpeechRecognitionEventMap, event: SpeechRecognitionEvent) => any) | null;
  onend?: ((this: SpeechRecognitionEventMap, event: Event) => any) | null;
  onerror?: ((this: SpeechRecognitionEventMap, event: SpeechRecognitionError) => any) | null;
  onresult?: ((this: SpeechRecognitionEventMap, event: SpeechRecognitionEvent) => any) | null;
  onspeechend?: ((this: SpeechRecognitionEventMap, event: Event) => any) | null;
  onstart?: ((this: SpeechRecognitionEventMap, event: Event) => any) | null;
  grammars?: SpeechGrammarList;
  lang?: string;
  interimResults?: boolean;
  maxAlternatives?: number;
  serviceURI?: string;
  start(): void;
  stop(): void;
  abort(): void;
}

interface Window {
  webkitSpeechRecognition: new () => SpeechRecognition;
}
