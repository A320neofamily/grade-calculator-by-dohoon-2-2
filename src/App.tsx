import { useEffect, useMemo, useState } from "react";

type Assessment = {
  id: string;
  type: "지필평가" | "수행평가";
  title: string;
  period: string;
  weight: number;
};

type Subject = {
  id: string;
  name: string;
  color: string;
  assessments: Assessment[];
};

type Scores = Record<string, string>;

const subjects: Subject[] = [
  {
    id: "korean",
    name: "국어",
    color: "bg-rose-500",
    assessments: [
      { id: "midterm", type: "지필평가", title: "중간고사", period: "10. 2.(금) · 4교시", weight: 30 },
      { id: "final", type: "지필평가", title: "기말고사", period: "12. 7.(월) · 2교시", weight: 30 },
      { id: "intro", type: "수행평가", title: "복합 양식 자료를 활용한 소개 글 쓰기", period: "9~10월", weight: 20 },
      { id: "reading", type: "수행평가", title: "한 학기 한 권 읽기 프로젝트", period: "11월", weight: 20 },
    ],
  },
  {
    id: "ethics",
    name: "도덕",
    color: "bg-amber-500",
    assessments: [
      { id: "metaverse", type: "수행평가", title: "가상공간 크리에이터 프로젝트", period: "10월", weight: 50 },
      { id: "newspaper", type: "수행평가", title: "통일 한국 신문 기획하기", period: "11월", weight: 50 },
    ],
  },
  {
    id: "history",
    name: "역사",
    color: "bg-orange-500",
    assessments: [
      { id: "final", type: "지필평가", title: "기말고사", period: "12. 8.(화) · 3교시", weight: 40 },
      { id: "revolution", type: "수행평가", title: "산업혁명 바로 알기 프로젝트", period: "10월", weight: 30 },
      { id: "china", type: "수행평가", title: "중국 근대화 운동 보고서", period: "10월", weight: 30 },
    ],
  },
  {
    id: "math",
    name: "수학",
    color: "bg-indigo-500",
    assessments: [
      { id: "midterm", type: "지필평가", title: "중간고사", period: "10. 2.(금) · 2교시", weight: 30 },
      { id: "final", type: "지필평가", title: "기말고사", period: "12. 7.(월) · 4교시", weight: 30 },
      { id: "geometry", type: "수행평가", title: "도형 프로젝트", period: "9~11월", weight: 20 },
      { id: "essay", type: "수행평가", title: "수학 서술 챌린지", period: "9~12월", weight: 20 },
    ],
  },
  {
    id: "science",
    name: "과학",
    color: "bg-emerald-500",
    assessments: [
      { id: "midterm", type: "지필평가", title: "중간고사", period: "10. 1.(목) · 2교시", weight: 30 },
      { id: "final", type: "지필평가", title: "기말고사", period: "12. 8.(화) · 4교시", weight: 30 },
      { id: "circulation", type: "수행평가", title: "순환계의 구조와 기능", period: "11월", weight: 20 },
      { id: "experiment", type: "수행평가", title: "몸의 법칙 실험", period: "11월", weight: 20 },
    ],
  },
  {
    id: "tech",
    name: "기술·가정",
    color: "bg-teal-500",
    assessments: [
      { id: "construction", type: "수행평가", title: "건설기술 문제해결", period: "9~11월", weight: 50 },
      { id: "resource", type: "수행평가", title: "지속가능한 자원관리", period: "9~10월", weight: 30 },
      { id: "family", type: "수행평가", title: "건강한 가족관계", period: "11월", weight: 20 },
    ],
  },
  {
    id: "english",
    name: "영어",
    color: "bg-blue-500",
    assessments: [
      { id: "midterm", type: "지필평가", title: "중간고사", period: "10. 1.(목) · 4교시", weight: 30 },
      { id: "final", type: "지필평가", title: "기말고사", period: "12. 8.(화) · 2교시", weight: 30 },
      { id: "listening", type: "수행평가", title: "영어듣기", period: "9월", weight: 10 },
      { id: "writing", type: "수행평가", title: "영어쓰기", period: "10~11월", weight: 15 },
      { id: "speaking", type: "수행평가", title: "영어말하기", period: "10~11월", weight: 15 },
    ],
  },
  {
    id: "japanese",
    name: "일본어",
    color: "bg-red-500",
    assessments: [
      { id: "final", type: "지필평가", title: "기말고사", period: "12. 7.(월) · 3교시", weight: 40 },
      { id: "kana", type: "수행평가", title: "가타카나 받아쓰기", period: "9~10월", weight: 30 },
      { id: "conversation", type: "수행평가", title: "기초회화", period: "11월", weight: 30 },
    ],
  },
  {
    id: "pe",
    name: "체육",
    color: "bg-cyan-500",
    assessments: [
      { id: "basketball1", type: "수행평가", title: "농구", period: "9월", weight: 30 },
      { id: "volleyball1", type: "수행평가", title: "배구 Ⅰ", period: "11월", weight: 30 },
      { id: "volleyball2", type: "수행평가", title: "배구 Ⅱ", period: "11~12월", weight: 40 },
    ],
  },
  {
    id: "music",
    name: "음악",
    color: "bg-violet-500",
    assessments: [
      { id: "piano", type: "수행평가", title: "피아노 코드 반주", period: "9월", weight: 40 },
      { id: "drum", type: "수행평가", title: "드럼 반주", period: "10월", weight: 30 },
      { id: "choir", type: "수행평가", title: "2부 합창", period: "11월", weight: 30 },
    ],
  },
  {
    id: "art",
    name: "미술",
    color: "bg-fuchsia-500",
    assessments: [
      { id: "dokdo", type: "수행평가", title: "독도 홍보 포스터", period: "8~10월", weight: 50 },
      { id: "unification", type: "수행평가", title: "통일 홍보 포스터", period: "10~12월", weight: 50 },
    ],
  },
];

const STORAGE_KEY = "semester-score-calculator";
const THREE_LEVEL_SUBJECT_IDS = new Set(["pe", "music", "art"]);

function scoreKey(subjectId: string, assessmentId: string) {
  return `${subjectId}.${assessmentId}`;
}

function getSubjectResult(subject: Subject, scores: Scores) {
  const filled = subject.assessments.filter(
    (item) => scores[scoreKey(subject.id, item.id)] !== undefined && scores[scoreKey(subject.id, item.id)] !== "",
  ).length;
  const score = subject.assessments.reduce((total, item) => {
    const value = Number(scores[scoreKey(subject.id, item.id)] || 0);
    return total + value * (item.weight / 100);
  }, 0);

  return {
    score,
    filled,
    total: subject.assessments.length,
    complete: filled === subject.assessments.length,
  };
}

function getAchievement(score: number, subjectId: string) {
  const roundedScore = Math.round(score);

  if (THREE_LEVEL_SUBJECT_IDS.has(subjectId)) {
    if (roundedScore >= 80) return "A";
    if (roundedScore >= 60) return "B";
    return "C";
  }

  if (roundedScore >= 90) return "A";
  if (roundedScore >= 80) return "B";
  if (roundedScore >= 70) return "C";
  if (roundedScore >= 60) return "D";
  return "E";
}

function Icon({
  name,
  className = "size-5",
}: {
  name: "book" | "chart" | "check" | "spark" | "trash" | "arrow";
  className?: string;
}) {
  const paths = {
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19H2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    spark: (
      <>
        <path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z" />
        <path d="m5 17-.7 2.3L2 20l2.3.7L5 23l.7-2.3L8 20l-2.3-.7L5 17Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="m19 6-1 15H6L5 6" />
        <path d="M10 11v5M14 11v5" />
      </>
    ),
    arrow: (
      <>
        <path d="m9 18 6-6-6-6" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

export default function App() {
  const [activeSubjectId, setActiveSubjectId] = useState(subjects[0].id);
  const [scores, setScores] = useState<Scores>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  const activeSubject = subjects.find((subject) => subject.id === activeSubjectId) || subjects[0];
  const results = useMemo(
    () => Object.fromEntries(subjects.map((subject) => [subject.id, getSubjectResult(subject, scores)])),
    [scores],
  );
  const completedResults = subjects
    .map((subject) => ({ subject, ...results[subject.id] }))
    .filter((result) => result.complete);
  const average = completedResults.length
    ? completedResults.reduce((sum, result) => sum + result.score, 0) / completedResults.length
    : 0;
  const activeResult = results[activeSubject.id];
  const getExamAverage = (examId: "midterm" | "final") => {
    const exams = subjects.flatMap((subject) =>
      subject.assessments
        .filter((assessment) => assessment.type === "지필평가" && assessment.id === examId)
        .map((assessment) => ({
          key: scoreKey(subject.id, assessment.id),
        })),
    );
    const enteredScores = exams
      .map((exam) => scores[exam.key])
      .filter((score) => score !== undefined && score !== "");

    return {
      average:
        enteredScores.length > 0
          ? enteredScores.reduce((sum, score) => sum + Number(score), 0) / enteredScores.length
          : null,
      entered: enteredScores.length,
      total: exams.length,
    };
  };
  const midtermAverage = getExamAverage("midterm");
  const finalAverage = getExamAverage("final");
  const missingAssessments = activeSubject.assessments.filter(
    (item) => scores[scoreKey(activeSubject.id, item.id)] === undefined || scores[scoreKey(activeSubject.id, item.id)] === "",
  );
  const achievementGuide = (() => {
    if (missingAssessments.length !== 1) return null;

    const remaining = missingAssessments[0];
    const maximumScore = activeResult.score + remaining.weight;
    const roundedMaximumScore = Math.round(maximumScore);
    const targets = THREE_LEVEL_SUBJECT_IDS.has(activeSubject.id)
      ? [
          { grade: "A", threshold: 80 },
          { grade: "B", threshold: 60 },
          { grade: "C", threshold: 0 },
        ]
      : [
          { grade: "A", threshold: 90 },
          { grade: "B", threshold: 80 },
          { grade: "C", threshold: 70 },
          { grade: "D", threshold: 60 },
          { grade: "E", threshold: 0 },
        ];
    const target = targets.find((item) => roundedMaximumScore >= item.threshold) || targets[targets.length - 1];
    const minimumRawScore = target.threshold === 0 ? 0 : target.threshold - 0.5;
    const exactMinimum = (minimumRawScore - activeResult.score) / (remaining.weight / 100);
    const minimumScore = Math.min(100, Math.max(0, Math.round(exactMinimum)));

    return { remaining, grade: target.grade, minimumScore };
  })();

  function updateScore(key: string, value: string) {
    if (value === "") {
      setScores((current) => ({ ...current, [key]: "" }));
      return;
    }
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      setScores((current) => ({ ...current, [key]: String(Math.min(100, Math.max(0, parsed))) }));
    }
  }

  function clearScores() {
    if (Object.values(scores).some((value) => value !== "") && window.confirm("입력한 모든 점수를 초기화할까요?")) {
      setScores({});
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
              <Icon name="book" className="size-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[0.16em] text-indigo-600">2학기 평가</p>
              <p className="text-lg font-extrabold tracking-tight">원점수 계산기</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!Object.values(scores).some((value) => value !== "")}
            onClick={clearScores}
            type="button"
          >
            <Icon name="trash" className="size-4" />
            <span className="hidden sm:inline">전체 초기화</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10">
        <section className="mb-8">
          <div className="mb-5">
            <p className="mb-1 text-sm font-bold text-indigo-600">내 성적 한눈에 보기</p>
            <h1 className="whitespace-nowrap text-[25px] font-black tracking-tight">2026 만덕중 2-2 성적계산기</h1>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm shadow-indigo-100/60">
              <div className="mb-4 flex size-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                <Icon name="chart" className="size-5" />
              </div>
              <p className="text-sm font-semibold text-indigo-700">중간고사 4과목 평균</p>
              <p className="mt-1 text-2xl font-black text-indigo-950">
                {midtermAverage.average === null ? "—" : midtermAverage.average.toFixed(2)}
                {midtermAverage.average !== null && (
                  <span className="ml-1 text-sm font-semibold text-indigo-400">점</span>
                )}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-indigo-400">
                {midtermAverage.entered}/{midtermAverage.total}과목 입력
              </p>
            </div>
            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 shadow-sm shadow-violet-100/60">
              <div className="mb-4 flex size-9 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                <Icon name="chart" className="size-5" />
              </div>
              <p className="text-sm font-semibold text-violet-700">기말고사 6과목 평균</p>
              <p className="mt-1 text-2xl font-black text-violet-950">
                {finalAverage.average === null ? "—" : finalAverage.average.toFixed(2)}
                {finalAverage.average !== null && (
                  <span className="ml-1 text-sm font-semibold text-violet-400">점</span>
                )}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-violet-400">
                {finalAverage.entered}/{finalAverage.total}과목 입력
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
              <div className="mb-4 flex size-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon name="check" className="size-5" />
              </div>
              <p className="text-sm font-semibold text-slate-500">입력 완료 과목</p>
              <p className="mt-1 text-2xl font-black">
                {completedResults.length}
                <span className="ml-1 text-sm font-semibold text-slate-400">/ {subjects.length}과목</span>
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
              <div className="mb-4 flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon name="chart" className="size-5" />
              </div>
              <p className="text-sm font-semibold text-slate-500">원점수 평균</p>
              <p className="mt-1 text-2xl font-black">
                {completedResults.length ? average.toFixed(1) : "—"}
                {completedResults.length > 0 && <span className="ml-1 text-sm font-semibold text-slate-400">점</span>}
              </p>
            </div>
          </div>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-extrabold">과목 선택</h2>
              <p className="mt-1 text-xs text-slate-400">과목별 입력 현황을 확인하세요</p>
            </div>
            <nav className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-1 lg:overflow-visible" aria-label="과목 목록">
              {subjects.map((subject) => {
                const result = results[subject.id];
                const active = subject.id === activeSubject.id;
                return (
                  <button
                    key={subject.id}
                    className={`group flex min-w-44 items-center gap-3 rounded-xl px-3 py-3 text-left transition lg:w-full ${
                      active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    onClick={() => setActiveSubjectId(subject.id)}
                    type="button"
                  >
                    <span className={`size-2.5 shrink-0 rounded-full ${subject.color}`} />
                    <span className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3">
                      <span className="truncate text-sm font-bold leading-5">{subject.name}</span>
                      <span
                        className={`text-right text-base font-black leading-5 ${
                          result.complete ? (active ? "text-indigo-700" : "text-slate-900") : "text-slate-300"
                        }`}
                      >
                        {result.complete ? getAchievement(result.score, subject.id) : "—"}
                      </span>
                      <span
                        className={`text-[11px] leading-4 ${active ? "text-indigo-400" : "text-slate-400"}`}
                      >
                        {result.complete ? "입력 완료" : `${result.filled}/${result.total} 입력`}
                      </span>
                      <span
                        className={`text-right text-[11px] font-semibold leading-4 ${
                          active ? "text-indigo-400" : "text-slate-400"
                        }`}
                      >
                        {result.complete ? `${result.score.toFixed(1)}점` : ""}
                      </span>
                    </span>
                    <Icon name="arrow" className={`size-4 shrink-0 ${active ? "text-indigo-400" : "text-slate-300"}`} />
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
            <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className={`size-3 rounded-full ${activeSubject.color}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black">{activeSubject.name}</h2>
                      {activeResult.complete && (
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                          입력 완료
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {activeResult.filled}개 입력 · 총 {activeResult.total}개 평가
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white sm:min-w-44">
                  <p className="text-xs font-semibold text-slate-400">
                    {activeResult.complete ? "최종 원점수" : "현재 예상 원점수"}
                  </p>
                  <p className="mt-1 text-3xl font-black tabular-nums">
                    {activeResult.score.toFixed(0)}
                    <span className="ml-1 text-sm font-semibold text-slate-400">/ 100</span>
                  </p>
                </div>
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${(activeResult.filled / activeResult.total) * 100}%` }}
                />
              </div>
              {achievementGuide && (
                <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                    <Icon name="spark" className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">
                      최고 성취도 {achievementGuide.grade}까지 도전할 수 있어요
                    </p>
                    <p className="mt-1 text-xs leading-5 text-amber-800">
                      남은 &lsquo;{achievementGuide.remaining.title}&rsquo;에서 최소{" "}
                      <strong className="font-black">{achievementGuide.minimumScore}점</strong>
                      을 받으면 성취도 {achievementGuide.grade}를 달성할 수 있습니다.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 sm:p-7">
              {(["지필평가", "수행평가"] as const).map((type) => {
                const items = activeSubject.assessments.filter((item) => item.type === type);
                if (!items.length) return null;
                return (
                  <div className="mb-8 last:mb-0" key={type}>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="text-sm font-extrabold">{type}</h3>
                      <span className="text-xs font-medium text-slate-400">
                        총 {items.reduce((sum, item) => sum + item.weight, 0)}% 반영
                      </span>
                    </div>
                    <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
                      {items.map((item) => {
                        const key = scoreKey(activeSubject.id, item.id);
                        const value = scores[key] ?? "";
                        const contribution = Number(value || 0) * (item.weight / 100);
                        return (
                          <div
                            className="grid gap-4 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_8rem_8.5rem] sm:items-center sm:px-5"
                            key={item.id}
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-slate-800">{item.title}</p>
                              <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
                                <span>{item.period}</span>
                                <span className="size-1 rounded-full bg-slate-300" />
                                <span className="font-semibold text-indigo-600">{item.weight}% 반영</span>
                              </div>
                            </div>
                            <div className="hidden text-right sm:block">
                              <p className="text-[11px] font-medium text-slate-400">반영 점수</p>
                              <p className="mt-0.5 text-sm font-bold tabular-nums text-slate-600">
                                {value === "" ? "—" : contribution.toFixed(1)}점
                              </p>
                            </div>
                            <label className="relative block">
                              <span className="sr-only">{item.title} 점수</span>
                              <input
                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-right text-base font-extrabold tabular-nums outline-none transition placeholder:font-medium placeholder:text-slate-300 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                inputMode="decimal"
                                max="100"
                                min="0"
                                onChange={(event) => updateScore(key, event.target.value)}
                                placeholder="0"
                                type="number"
                                value={value}
                              />
                              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                                점
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
