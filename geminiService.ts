
import { GoogleGenAI } from "@google/genai";

export async function getFitnessTip(score: number, nickname: string): Promise<string> {
  try {
    // API 키 주입 시점과의 충돌을 방지하기 위해 함수 호출 시점에 인스턴스 생성
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `당신은 '프로칼로(ProCalo)'의 유쾌하고 센스 넘치는 헬스 성향 분석가입니다.
      사용자 '${nickname}'님이 훈련 게임에서 ${score}점을 획득했습니다. 이 결과를 바탕으로 마치 '재미있는 심리테스트 결과지'처럼 긍정적이고 활기찬 분석을 작성하세요.

      [절대 금지 사항 - AI 흔적 지우기]
      1. 별표(**), 언더바(__), 샵(#), 대시(-) 등 어떤 마크다운 기호도 사용하지 마세요. 오직 한글과 문장 부호(. , ! ?)만 사용하세요.
      2. '분석 결과:', '성향:', '추천:' 같은 딱딱한 분류 항목을 만들지 마세요.
      3. '사용자는 ~한 타입입니다' 같은 관찰자 시점보다는 '${nickname}님은 ~하시네요!' 같은 직접적인 대화체를 사용하세요.
      4. 로봇처럼 보이지 않도록 '오운완', '득근', '쇠질', '근성장' 같은 헬스장 용어를 섞어 친근하게 작성하세요.

      [분석 가이드라인]
      - 점수에 따라 '성장 가능성 만렙 새싹', '헬스장 우등생', '고중량 지배자', '인간 크레인' 등 재미있는 별명을 부여하세요.
      - 닉네임 '${nickname}'을 자연스럽게 불러주세요.
      - 마지막에는 프로칼로의 아이템(리프팅 벨트, 스트랩, 무릎 보호대 중 하나)을 '${nickname}'님의 운명적 동반자로 추천하며 즐겁게 마무리하세요.
      - 전체 분량은 120자 내외로, 읽자마자 기분이 좋아지는 긍정적인 내용이어야 합니다.`,
      config: {
        temperature: 0.9,
      }
    });
    
    let cleanText = (response.text || "").replace(/[*_#\-]/g, '').trim();
    cleanText = cleanText.replace(/분석 결과입니다|분석 내용입니다|다음은 결과입니다/g, '').trim();
    
    return cleanText || `${nickname}님은 오늘 헬스장의 주인공이 될 상이시네요! 프로칼로 기어와 함께 안전하고 즐겁게 득근하시길 응원해요!`;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `${nickname}님, 분석 결과 당신은 무한한 가능성을 가진 숨은 고수! 프로칼로 스트랩만 있으면 바로 신기록 갱신 각입니다!`;
  }
}
