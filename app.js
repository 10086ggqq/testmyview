// 默认题库：计算机视觉题库
const DEFAULT_BANK_TEXT = `#name: 计算机视觉题库
#id: cv_questions

[type:essay]
计算机视觉的常见任务有哪些？
[answer:图像分类、目标检测、图像分割、人脸识别、姿态估计、图像生成等。]
[explain:计算机视觉是让机器理解图像和视频的学科，常见任务涵盖从基础识别到高级生成。]

[type:essay]
OpenCV的核心模块是什么？它主要包括哪些函数？
[answer:核心模块是cv2，主要包括图像读取、显示、保存、变换、滤波、特征检测等函数。]
[explain:OpenCV的Python接口为cv2，提供了丰富的图像处理函数。]

[type:essay]
简述图像数字化的关键环节。
[answer:采样和量化。采样将连续图像空间离散化为像素，量化将灰度值离散化为整数。]
[explain:数字化是模拟信号转数字信号的基础步骤，直接影响图像质量。]

[type:essay]
在OpenCV中，图像的常用属性有哪些？分别表示什么含义？
[answer:shape（高度、宽度、通道数）、dtype（数据类型）、size（像素总数）。]
[explain:这些属性帮助了解图像的基本结构和存储方式。]

[type:essay]
HSV色彩空间中的H、S、V分别代表什么？在OpenCV中，它们的取值范围分别是多少？
[answer:H色调（0-180），S饱和度（0-255），V明度（0-255）。]
[explain:HSV更符合人类视觉感知，OpenCV中H范围折半以适配uint8。]

[type:essay]
图像的位运算有哪几种？在OpenCV中对应的函数分别是什么？
[answer:按位与（cv2.bitwise_and）、或（cv2.bitwise_or）、非（cv2.bitwise_not）、异或（cv2.bitwise_xor）。]
[explain:位运算用于图像掩膜、合成等操作。]

[type:essay]
图像的直方图有哪些性质？
[answer:反映像素灰度分布，不具有空间信息，可归一化，对旋转和尺度变化不敏感。]
[explain:直方图是图像全局特征，常用于对比度增强和阈值选择。]

[type:essay]
简述卷积运算的步骤。
[answer:将卷积核翻转（可选），在图像上滑动，对应位置相乘后求和，得到输出像素值。]
[explain:卷积是图像滤波和特征提取的核心操作。]

[type:essay]
简述Canny边缘检测算法的主要步骤。
[answer:高斯滤波平滑、计算梯度幅值和方向、非极大值抑制、双阈值检测和边缘连接。]
[explain:Canny是经典的边缘检测算法，具有良好的抗噪性和定位精度。]

[type:essay]
简述霍夫变换的基本原理。
[answer:将图像空间中的点映射到参数空间，通过投票累加检测直线或圆等形状。]
[explain:霍夫变换利用点-线对偶性，可鲁棒地检测几何形状。]

[type:essay]
在OpenCV中，如何实现Otsu阈值处理？
[answer:使用cv2.threshold()，设置阈值类型为cv2.THRESH_OTSU，自动计算最佳阈值。]
[explain:Otsu算法基于类间方差最大化，适用于双峰图像。]

[type:essay]
什么是形态学变换？它的基本运算有哪些？
[answer:基于形状的数学运算，包括腐蚀、膨胀、开运算、闭运算、梯度、顶帽、黑帽等。]
[explain:形态学常用于去除噪声、填充空洞和提取边界。]

[type:essay]
什么是高斯金字塔，简述构建高斯金字塔的过程。
[answer:高斯金字塔是一系列尺度递减的图像序列，通过高斯滤波和下采样（隔行隔列删除）构建。]
[explain:金字塔用于多尺度图像分析，如特征检测和图像融合。]

[type:essay]
简述OpenCV中使用SIFT算法检测、计算并绘制图像中特征点的步骤。
[answer:创建SIFT对象，调用detectAndCompute()检测关键点和描述子，使用drawKeypoints()绘制。]
[explain:SIFT是尺度不变特征变换，用于图像匹配和识别。]

[type:essay]
简述使用cv2.VideoCapture类读取视频的步骤。
[answer:创建VideoCapture对象（传入视频路径或设备号），循环调用read()读取帧，处理，最后释放。]
[explain:VideoCapture是OpenCV处理视频的核心类。]

[type:essay]
简述cv2.VideoWriter_fourcc()方法的功能，并举例说明。
[answer:用于指定视频编码格式，例如cv2.VideoWriter_fourcc('M','J','P','G')表示MJPG编码。]
[explain:fourcc是四字符码，定义视频压缩格式。]

[type:essay]
简述级联分类器的原理。
[answer:基于Haar-like或LBP特征，通过级联多个弱分类器组成强分类器，用于目标检测（如人脸检测）。]
[explain:级联结构能快速排除非目标区域，提高检测效率。]

[type:essay]
简述人脸识别的步骤。
[answer:人脸检测、对齐、特征提取、特征比对、识别（验证或识别身份）。]
[explain:人脸识别流程包括检测和识别两个主要阶段。]`;

const STORAGE_KEY = 'brutal-memory-bank';
const STATS_KEY = 'brutal-memory-stats';
const STUDY_KEY = 'brutal-study-time';
const STUDY_THRESHOLD_KEY = 'brutal-study-threshold';
const STUDY_PENDING_KEY = 'brutal-study-pending';
const AI_KEY = 'brutal-ai-config';

// 免费大模型供应商配置
// quotaType: daily_cny(每日元) | total_tokens(总token) | total_cny(总额度元) | daily_requests(每日次数)
const AI_PROVIDERS = {
  siliconflow: {
    name: '硅基流动',
    models: ['Qwen/Qwen2.5-7B-Instruct', 'deepseek-ai/DeepSeek-V3', 'THUDM/glm-4-9b-chat'],
    freeQuota: 14,
    quotaType: 'daily_cny',
    quotaLabel: '每日 ¥14',
    apiStyle: 'openai',
    endpoint: 'https://api.siliconflow.cn/v1/chat/completions'
  },
  dashscope: {
    name: '通义百炼',
    models: ['qwen-turbo', 'qwen-plus'],
    freeQuota: 1000000,
    quotaType: 'total_tokens',
    quotaLabel: '100万 token',
    apiStyle: 'dashscope',
    endpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'
  },
  deepseek: {
    name: 'DeepSeek',
    models: ['deepseek-chat'],
    freeQuota: 10,
    quotaType: 'total_cny',
    quotaLabel: '¥10 额度',
    apiStyle: 'openai',
    endpoint: 'https://api.deepseek.com/v1/chat/completions'
  },
  gemini: {
    name: 'Google Gemini',
    models: ['gemini-2.0-flash', 'gemini-1.5-flash'],
    freeQuota: 1500,
    quotaType: 'daily_requests',
    quotaLabel: '每日 1500 次',
    apiStyle: 'gemini',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models'
  }
};

let state = {
  currentBankId: '',
  banks: {},
  reviewIndex: 0,
  memoryIndex: 0,
  battle: { queue: [], index: 0, total: 0, correct: 0 }
};

let stats = { total: 0, correct: 0, lastDate: '', today: 0 };
let study = { sessions: [], threshold: 60, totalSeconds: 0, startTime: 0, committed: false };

// AI 判题配置（默认关闭）
let aiConfig = {
  enabled: false,
  autoSwitch: true,
  currentProvider: 'siliconflow',
  currentModel: 'Qwen/Qwen2.5-7B-Instruct',
  apiKeys: {},        // { provider: apiKey }
  usage: {}           // { provider: { used, date } }
};

function init() {
  loadStats();
  initStudy();
  loadAIConfig();
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      // 兼容旧版单题库数据：迁移为多题库
      if (data.questions && Array.isArray(data.questions)) {
        const id = data.id || 'default';
        state.banks[id] = {
          name: data.name || '默认题库',
          id,
          questions: data.questions
        };
        state.currentBankId = id;
      } else if (data.banks) {
        state = { ...state, ...data };
      }
    } catch (e) {}
  }

  // 没有题库时加载默认 CV 题库
  if (Object.keys(state.banks).length === 0) {
    loadDefaultBank();
  }

  // 确保当前题库 ID 有效
  if (!state.banks[state.currentBankId]) {
    state.currentBankId = Object.keys(state.banks)[0];
  }

  bindEvents();
  renderHome();
  renderReview();
  renderMemory();
  renderBattle();
  renderProfile();
  renderDashboard();
  initNavAutoHide();
}

function currentBank() {
  return state.banks[state.currentBankId] || { name: '', id: '', questions: [] };
}

function loadDefaultBank() {
  parseAndSetBank(DEFAULT_BANK_TEXT);
}

function parseBankText(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  let name = '';
  let id = '';
  const questions = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      if (current && current.question && current.answer) {
        questions.push(current);
        current = null;
      }
      continue;
    }

    if (line.startsWith('#name:')) {
      name = line.slice(6).trim();
      continue;
    }
    if (line.startsWith('#id:')) {
      id = line.slice(4).trim();
      continue;
    }
    if (line === '[type:essay]') {
      if (current && current.question && current.answer) {
        questions.push(current);
      }
      current = { type: 'essay', question: '', answer: '', explain: '' };
      continue;
    }

    if (!current) continue;

    if (line.startsWith('[answer:')) {
      const end = line.endsWith(']') ? line.length - 1 : line.length;
      current.answer = line.slice(8, end).trim().replace(/\\n/g, '\n');
    } else if (line.startsWith('[explain:')) {
      const end = line.endsWith(']') ? line.length - 1 : line.length;
      current.explain = line.slice(9, end).trim().replace(/\\n/g, '\n');
    } else if (/^分值\s*\d+\s*分?$/.test(line)) {
      current.score = parseInt(line.match(/\d+/)[0], 10);
    } else {
      current.question = current.question ? current.question + ' ' + line : line;
    }
  }

  if (current && current.question && current.answer) {
    questions.push(current);
  }

  if (questions.length === 0) return null;

  return {
    name: name || '未命名题库',
    id: id || `bank_${Date.now()}`,
    questions: questions.map((q, idx) => ({ ...q, id: idx + 1 }))
  };
}

function parseAndSetBank(text) {
  const bank = parseBankText(text);
  if (!bank) return false;
  state.banks[bank.id] = bank;
  setCurrentBank(bank.id);
  return true;
}

function setCurrentBank(id) {
  if (!state.banks[id]) return;
  state.currentBankId = id;
  state.reviewIndex = 0;
  state.memoryIndex = 0;
  resetBattle();
  saveBank();
}

function deleteBank(id) {
  if (!state.banks[id]) return;
  const bank = state.banks[id];
  if (!confirm(`确定删除题库「${bank.name}」吗？此操作不可撤销。`)) return;
  delete state.banks[id];
  if (state.currentBankId === id) {
    const remaining = Object.keys(state.banks);
    if (remaining.length > 0) {
      setCurrentBank(remaining[0]);
    } else {
      state.currentBankId = '';
      saveBank();
    }
  } else {
    saveBank();
  }
  renderHome();
  renderReview();
  renderMemory();
  renderBattle();
  renderProfile();
}

function saveBank() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    currentBankId: state.currentBankId,
    banks: state.banks
  }));
}

function loadStats() {
  const raw = localStorage.getItem(STATS_KEY);
  if (raw) {
    try {
      stats = JSON.parse(raw);
    } catch (e) {}
  }
  const today = new Date().toLocaleDateString();
  if (stats.lastDate !== today) {
    stats.lastDate = today;
    stats.today = 0;
    saveStats();
  }
}

function saveStats() {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function initStudy() {
  loadStudyThreshold();
  loadStudySessions();
  recoverPendingStudySession();
  study.startTime = Date.now();
  study.committed = false;

  window.addEventListener('beforeunload', commitStudySession);
  window.addEventListener('pagehide', commitStudySession);
  window.addEventListener('pageshow', () => { study.committed = false; });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      backupPendingStudySession();
    } else {
      sessionStorage.removeItem(STUDY_PENDING_KEY);
    }
  });

  startStudyTimer();
}

function loadStudySessions() {
  const raw = localStorage.getItem(STUDY_KEY);
  if (raw) {
    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) study.sessions = data;
    } catch (e) {}
  }
  study.totalSeconds = study.sessions.reduce((sum, s) => sum + s.duration, 0);
}

function loadStudyThreshold() {
  const raw = localStorage.getItem(STUDY_THRESHOLD_KEY);
  if (raw) {
    const n = parseInt(raw, 10);
    if (!isNaN(n) && n >= 1) study.threshold = n;
  }
}

function saveStudyThreshold(value) {
  const n = parseInt(value, 10);
  if (!isNaN(n) && n >= 1) {
    study.threshold = n;
    localStorage.setItem(STUDY_THRESHOLD_KEY, String(n));
  }
}

function addStudySession(duration, bankId, bankName, endTime) {
  const bank = currentBank();
  const session = {
    id: generateStudyId(),
    bankId: bankId || bank.id || '',
    bankName: bankName || bank.name || '未命名题库',
    duration: Math.max(0, Math.floor(duration)),
    date: endTime ? new Date(endTime).toISOString() : new Date().toISOString()
  };
  study.sessions.push(session);
  study.totalSeconds += session.duration;
  localStorage.setItem(STUDY_KEY, JSON.stringify(study.sessions));
}

function backupPendingStudySession() {
  const elapsed = Math.floor((Date.now() - study.startTime) / 1000);
  if (elapsed < study.threshold) {
    sessionStorage.removeItem(STUDY_PENDING_KEY);
    return;
  }
  const bank = currentBank();
  sessionStorage.setItem(STUDY_PENDING_KEY, JSON.stringify({
    startTime: study.startTime,
    elapsed,
    bankId: bank.id || '',
    bankName: bank.name || ''
  }));
}

function recoverPendingStudySession() {
  const raw = sessionStorage.getItem(STUDY_PENDING_KEY);
  if (!raw) return;
  try {
    const pending = JSON.parse(raw);
    if (pending.elapsed >= study.threshold) {
      addStudySession(pending.elapsed, pending.bankId, pending.bankName, pending.startTime + pending.elapsed * 1000);
    }
  } catch (e) {}
  sessionStorage.removeItem(STUDY_PENDING_KEY);
}

function commitStudySession() {
  if (study.committed) return;
  const elapsed = Math.floor((Date.now() - study.startTime) / 1000);
  if (elapsed >= study.threshold) {
    addStudySession(elapsed);
  }
  study.committed = true;
  sessionStorage.removeItem(STUDY_PENDING_KEY);
}

function generateStudyId() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function startStudyTimer() {
  const update = () => {
    const elapsed = Math.floor((Date.now() - study.startTime) / 1000);
    const totalSeconds = getTotalStudySeconds(elapsed);
    const totalEl = document.getElementById('study-total');
    const sessionEl = document.getElementById('study-session');
    const formattedEl = document.getElementById('study-formatted');
    if (totalEl) totalEl.textContent = String(totalSeconds);
    if (sessionEl) sessionEl.textContent = String(elapsed);
    if (formattedEl) formattedEl.textContent = formatDuration(totalSeconds);
    setTimeout(update, 1000);
  };
  update();
}

function getTotalStudySeconds(currentElapsed) {
  const current = currentElapsed >= study.threshold ? currentElapsed : 0;
  return study.totalSeconds + current;
}

function exportStudyCSV() {
  const elapsed = Math.floor((Date.now() - study.startTime) / 1000);
  if (elapsed >= study.threshold) {
    addStudySession(elapsed);
    study.startTime = Date.now();
    study.committed = false;
  }
  const headers = ['唯一ID', '题库名称', '学习时长(秒)', '学习时长', '年', '月', '日'];
  const rows = study.sessions.map(s => {
    const d = new Date(s.date);
    return [s.id, s.bankName, s.duration, formatDuration(s.duration), d.getFullYear(), d.getMonth() + 1, d.getDate()];
  });
  const csv = [headers, ...rows].map(row => row.map(escapeCsvCell).join(',')).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `study_time_${formatDateFileName(new Date())}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function escapeCsvCell(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function formatDateFileName(date) {
  const d = new Date(date);
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

function recordTrain(correct) {
  stats.total += 1;
  if (correct) stats.correct += 1;
  stats.today = (stats.today || 0) + 1;
  saveStats();
  renderProfile();
}

function bindEvents() {
  // 底部导航
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchPage(btn.dataset.page));
  });

  // 首页导入
  document.getElementById('btn-import').addEventListener('click', () => {
    const text = document.getElementById('import-input').value;
    const msg = document.getElementById('import-msg');
    if (!text.trim()) {
      msg.textContent = '请输入题库内容。';
      msg.className = 'import-msg err';
      return;
    }
    const ok = parseAndSetBank(text);
    if (ok) {
      const bank = currentBank();
      msg.textContent = `导入成功：${bank.name}，共 ${bank.questions.length} 题。`;
      msg.className = 'import-msg ok';
      renderHome();
      renderReview();
      renderMemory();
      renderBattle();
      renderProfile();
    } else {
      msg.textContent = '未解析到有效题目，请检查格式。';
      msg.className = 'import-msg err';
    }
  });

  document.getElementById('btn-load-default').addEventListener('click', () => {
    parseAndSetBank(DEFAULT_BANK_TEXT);
    document.getElementById('import-msg').textContent = '已加载默认计算机视觉题库。';
    document.getElementById('import-msg').className = 'import-msg ok';
    renderHome();
    renderReview();
    renderMemory();
    renderBattle();
    renderProfile();
  });

  // 背题
  document.getElementById('btn-review-prev').addEventListener('click', () => moveReview(-1));
  document.getElementById('btn-review-next').addEventListener('click', () => moveReview(1));
  document.getElementById('btn-review-toggle').addEventListener('click', toggleReviewAnswer);
  document.getElementById('btn-review-picker').addEventListener('click', openReviewPicker);
  document.getElementById('btn-review-modal-close').addEventListener('click', closeReviewPicker);
  document.getElementById('review-modal-backdrop').addEventListener('click', closeReviewPicker);

  // 记忆
  document.getElementById('btn-memory-prev').addEventListener('click', () => moveMemory(-1));
  document.getElementById('btn-memory-next').addEventListener('click', () => moveMemory(1));
  document.getElementById('btn-memory-judge').addEventListener('click', judgeMemory);
  document.getElementById('btn-memory-reset').addEventListener('click', resetMemoryQuestion);
  // 记忆输入框：Enter 判题，Shift+Enter 换行
  document.getElementById('memory-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      judgeMemory();
    }
  });
  const memoryEye = document.getElementById('memory-eye');
  const memoryAnswerWrap = document.getElementById('memory-answer-wrap');
  memoryEye.addEventListener('mouseenter', () => {
    memoryAnswerWrap.classList.remove('hidden');
    memoryEye.classList.add('show');
    memoryAnswerWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  memoryEye.addEventListener('mouseleave', () => {
    memoryAnswerWrap.classList.add('hidden');
    memoryEye.classList.remove('show');
  });
  memoryEye.addEventListener('click', () => {
    memoryAnswerWrap.classList.toggle('hidden');
    memoryEye.classList.toggle('show');
    if (!memoryAnswerWrap.classList.contains('hidden')) {
      memoryAnswerWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // 记忆页键盘快捷键：←/→ 切换题目，按住 Alt 显示答案
  let altRevealWasHidden = false;
  document.addEventListener('keydown', e => {
    const memPage = document.getElementById('page-memory');
    if (!memPage || !memPage.classList.contains('active')) return;

    if (e.key === 'Alt' && !e.repeat) {
      e.preventDefault();
      const reveal = document.getElementById('memory-reveal');
      const wrap = document.getElementById('memory-answer-wrap');
      const eye = document.getElementById('memory-eye');
      altRevealWasHidden = reveal.classList.contains('hidden');
      reveal.classList.remove('hidden');
      wrap.classList.remove('hidden');
      eye.classList.add('show');
      wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    if (e.isComposing) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveMemory(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveMemory(1);
    }
  });

  document.addEventListener('keyup', e => {
    if (e.key === 'Alt') {
      const reveal = document.getElementById('memory-reveal');
      const wrap = document.getElementById('memory-answer-wrap');
      const eye = document.getElementById('memory-eye');
      wrap.classList.add('hidden');
      eye.classList.remove('show');
      if (altRevealWasHidden) reveal.classList.add('hidden');
      altRevealWasHidden = false;
    }
  });

  window.addEventListener('blur', () => {
    const wrap = document.getElementById('memory-answer-wrap');
    const eye = document.getElementById('memory-eye');
    const reveal = document.getElementById('memory-reveal');
    wrap.classList.add('hidden');
    eye.classList.remove('show');
    if (altRevealWasHidden) reveal.classList.add('hidden');
    altRevealWasHidden = false;
  });

  // 实战
  document.getElementById('btn-battle-submit').addEventListener('click', submitBattle);
  document.getElementById('btn-battle-skip').addEventListener('click', nextBattle);

  // 我的
  document.getElementById('btn-export-study').addEventListener('click', exportStudyCSV);
  document.getElementById('study-threshold').addEventListener('change', e => {
    saveStudyThreshold(e.target.value);
  });

  document.getElementById('btn-clear').addEventListener('click', () => {
    if (confirm('确定清空所有学习数据与导入的题库吗？')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STATS_KEY);
      localStorage.removeItem(STUDY_KEY);
      localStorage.removeItem(STUDY_THRESHOLD_KEY);
      sessionStorage.removeItem(STUDY_PENDING_KEY);
      stats = { total: 0, correct: 0, lastDate: new Date().toLocaleDateString(), today: 0 };
      study.sessions = [];
      study.totalSeconds = 0;
      study.startTime = Date.now();
      study.committed = false;
      state = {
        currentBankId: '',
        banks: {},
        reviewIndex: 0,
        memoryIndex: 0,
        battle: { queue: [], index: 0, total: 0, correct: 0 }
      };
      loadDefaultBank();
      renderHome();
      renderReview();
      renderMemory();
      renderBattle();
      renderProfile();
    }
  });

  bindDashboardEvents();
}

function switchPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
  if (page === 'review') renderReview();
  if (page === 'memory') renderMemory();
  if (page === 'battle') renderBattle();
  if (page === 'profile') renderProfile();
  if (page === 'dashboard') renderDashboard();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function openReviewPicker() {
  const bank = currentBank();
  const modal = document.getElementById('review-modal');
  const list = document.getElementById('review-modal-list');
  if (bank.questions.length === 0) {
    list.innerHTML = '<div class="bank-empty">暂无题目</div>';
    modal.classList.remove('hidden');
    return;
  }
  list.innerHTML = bank.questions.map((q, idx) => {
    const current = idx === state.reviewIndex ? 'current' : '';
    return `<button class="picker-num ${current}" data-index="${idx}">${q.id}</button>`;
  }).join('');
  list.querySelectorAll('.picker-num').forEach(btn => {
    btn.addEventListener('click', () => {
      state.reviewIndex = parseInt(btn.dataset.index, 10);
      renderReview();
      closeReviewPicker();
    });
  });
  modal.classList.remove('hidden');
}

function closeReviewPicker() {
  document.getElementById('review-modal').classList.add('hidden');
}

function renderHome() {
  const list = document.getElementById('bank-list');
  const ids = Object.keys(state.banks);
  if (ids.length === 0) {
    list.innerHTML = '<div class="bank-empty">暂无题库，请先导入</div>';
    return;
  }
  list.innerHTML = ids.map(id => {
    const bank = state.banks[id];
    return `
      <div class="bank-card ${id === state.currentBankId ? 'active' : ''}" data-id="${escapeHtml(id)}">
        <button class="bank-delete-btn" data-id="${escapeHtml(id)}" title="删除题库" aria-label="删除题库">×</button>
        <div class="bank-name">${escapeHtml(bank.name)}</div>
        <div class="bank-meta">ID: ${escapeHtml(bank.id)} · ${bank.questions.length} 题</div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.bank-card').forEach(card => {
    card.addEventListener('click', () => {
      setCurrentBank(card.dataset.id);
      renderHome();
      renderReview();
      renderMemory();
      renderBattle();
      renderProfile();
    });
  });

  list.querySelectorAll('.bank-delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      deleteBank(btn.dataset.id);
    });
  });
}

function renderReview() {
  const bank = currentBank();
  const total = bank.questions.length;
  document.getElementById('review-counter').textContent = total ? `${state.reviewIndex + 1} / ${total}` : '0 / 0';
  if (total === 0) {
    document.getElementById('review-num').textContent = 'Q0';
    document.getElementById('review-question').textContent = '请先导入题库';
    document.getElementById('review-answer').textContent = '';
    document.getElementById('review-explain').textContent = '';
    return;
  }
  const q = bank.questions[state.reviewIndex];
  document.getElementById('review-num').textContent = `Q${q.id}`;
  document.getElementById('review-question').textContent = q.question;
  document.getElementById('review-answer').textContent = q.answer;
  document.getElementById('review-explain').textContent = q.explain || '暂无解析';
  document.getElementById('review-answer').classList.remove('visible');
  document.getElementById('review-explain').classList.remove('visible');
  document.getElementById('btn-review-toggle').textContent = '显示答案';
}

function moveReview(dir) {
  const bank = currentBank();
  if (bank.questions.length === 0) return;
  state.reviewIndex = (state.reviewIndex + dir + bank.questions.length) % bank.questions.length;
  renderReview();
}

function toggleReviewAnswer() {
  const ans = document.getElementById('review-answer');
  const exp = document.getElementById('review-explain');
  const visible = ans.classList.contains('visible');
  ans.classList.toggle('visible', !visible);
  exp.classList.toggle('visible', !visible);
  document.getElementById('btn-review-toggle').textContent = visible ? '显示答案' : '隐藏答案';
}

function renderMemory() {
  const bank = currentBank();
  const total = bank.questions.length;
  document.getElementById('memory-counter').textContent = total ? `${state.memoryIndex + 1} / ${total}` : '0 / 0';
  if (total === 0) {
    document.getElementById('memory-num').textContent = 'Q0';
    document.getElementById('memory-question').textContent = '请先导入题库';
    document.getElementById('memory-input').value = '';
    document.getElementById('memory-answer').textContent = '';
    document.getElementById('memory-feedback').className = 'feedback';
    document.getElementById('memory-feedback').textContent = '';
    document.getElementById('memory-reveal').classList.add('hidden');
    document.getElementById('memory-answer-wrap').classList.add('hidden');
    document.getElementById('memory-eye').classList.remove('show');
    document.getElementById('btn-memory-reset').classList.add('hidden');
    const judgeBtn = document.getElementById('btn-memory-judge');
    judgeBtn.disabled = false;
    judgeBtn.textContent = '判断';
    return;
  }
  const q = bank.questions[state.memoryIndex];
  document.getElementById('memory-num').textContent = `Q${q.id}`;
  document.getElementById('memory-question').textContent = q.question;
  const input = document.getElementById('memory-input');
  input.value = '';
  const feedback = document.getElementById('memory-feedback');
  document.getElementById('memory-answer').textContent = q.answer;
  feedback.className = 'feedback';
  feedback.textContent = '';
  document.getElementById('memory-reveal').classList.add('hidden');
  document.getElementById('memory-answer-wrap').classList.add('hidden');
  document.getElementById('memory-eye').classList.remove('show');
  document.getElementById('btn-memory-reset').classList.add('hidden');
  const judgeBtn2 = document.getElementById('btn-memory-judge');
  judgeBtn2.disabled = false;
  judgeBtn2.textContent = '判断';
}

function moveMemory(dir) {
  const bank = currentBank();
  if (bank.questions.length === 0) return;
  state.memoryIndex = (state.memoryIndex + dir + bank.questions.length) % bank.questions.length;
  renderMemory();
  document.getElementById('memory-input').focus();
}

async function judgeMemory() {
  const bank = currentBank();
  if (bank.questions.length === 0) return;
  const q = bank.questions[state.memoryIndex];
  const input = document.getElementById('memory-input');
  const feedback = document.getElementById('memory-feedback');
  const reveal = document.getElementById('memory-reveal');
  const answerWrap = document.getElementById('memory-answer-wrap');
  const resetBtn = document.getElementById('btn-memory-reset');
  const judgeBtn = document.getElementById('btn-memory-judge');

  if (!input.value.trim()) {
    feedback.textContent = '请先输入答案再判断。';
    feedback.className = 'feedback wrong';
    reveal.classList.remove('hidden');
    answerWrap.classList.add('hidden');
    document.getElementById('memory-eye').classList.remove('show');
    return;
  }

  const userAnswer = input.value;
  const result = compareAnswer(userAnswer, q.answer);
  reveal.classList.remove('hidden');
  answerWrap.classList.add('hidden'); // 默认隐藏答案，需悬停/点击眼睛查看
  document.getElementById('memory-eye').classList.remove('show');

  // 混合策略：AI 开启时，中间区间交给 AI
  const useAI = aiConfig.enabled && !!aiConfig.apiKeys[aiConfig.currentProvider];
  if (useAI && result.score >= 0.4 && result.score < 0.8) {
    // 显示加载状态
    const origText = judgeBtn.textContent;
    judgeBtn.textContent = 'AI 判题中…';
    judgeBtn.disabled = true;
    feedback.className = 'feedback';
    feedback.innerHTML = '<span class="ai-pending">AI 正在判题…</span>';

    let aiResult = null;
    try {
      aiResult = await judgeWithAI(q.question, q.answer, userAnswer);
    } catch (e) {
      aiResult = null;
    }

    judgeBtn.textContent = origText;
    judgeBtn.disabled = false;

    if (aiResult) {
      const pct = Math.round(aiResult.score * 100);
      const provName = AI_PROVIDERS[aiResult.provider]?.name || '';
      if (aiResult.correct) {
        feedback.innerHTML = `正确！AI 评分 ${pct}%（${provName}）${aiResult.feedback ? '：' + escapeHtml(aiResult.feedback) : ''}`;
        feedback.className = 'feedback correct';
        resetBtn.classList.remove('hidden');
        recordTrain(true);
      } else {
        feedback.innerHTML = `不对。AI 评分 ${pct}%（${provName}）${aiResult.feedback ? '：' + escapeHtml(aiResult.feedback) : ''}，已清空答案；点击眼睛查看正确答案。`;
        feedback.className = 'feedback wrong';
        input.value = '';
        resetBtn.classList.add('hidden');
        recordTrain(false);
      }
      // 刷新仪表盘额度显示
      renderDashboard();
      return;
    }
    // AI 全部失败 → 回退到本地判定
    feedback.textContent = 'AI 判题不可用，已回退到本地判定。';
  }

  // 本地判定
  if (result.score >= 0.65) {
    feedback.textContent = `正确！相似度 ${Math.round(result.score * 100)}%，点击眼睛查看/隐藏答案。`;
    feedback.className = 'feedback correct';
    resetBtn.classList.remove('hidden');
    recordTrain(true);
  } else {
    feedback.textContent = `不对，相似度 ${Math.round(result.score * 100)}%，已清空答案；点击眼睛查看/隐藏正确答案。`;
    feedback.className = 'feedback wrong';
    input.value = '';
    resetBtn.classList.add('hidden');
    recordTrain(false);
  }
}

function resetMemoryQuestion() {
  document.getElementById('memory-input').value = '';
  const feedback = document.getElementById('memory-feedback');
  feedback.className = 'feedback';
  feedback.textContent = '';
  document.getElementById('memory-reveal').classList.add('hidden');
  document.getElementById('memory-answer-wrap').classList.add('hidden');
  document.getElementById('memory-eye').classList.remove('show');
  document.getElementById('btn-memory-reset').classList.add('hidden');
}

function resetBattle() {
  const bank = currentBank();
  state.battle = {
    queue: bank.questions.length ? shuffle([...Array(bank.questions.length).keys()]) : [],
    index: 0,
    total: 0,
    correct: 0
  };
}

function renderBattle() {
  const bank = currentBank();
  // 首次进入实战页时若队列未生成，立即初始化
  if (bank.questions.length && state.battle.queue.length === 0) {
    resetBattle();
  }
  const b = state.battle;
  document.getElementById('battle-counter').textContent = `${b.total} / ${b.queue.length}`;
  if (b.queue.length === 0 || b.index >= b.queue.length) {
    document.getElementById('battle-num').textContent = 'Q?';
    document.getElementById('battle-question').textContent = '请先导入题库';
    document.getElementById('battle-input').value = '';
    document.getElementById('battle-feedback').className = 'feedback';
    document.getElementById('battle-feedback').textContent = '';
    updateBattleScore();
    return;
  }
  const q = bank.questions[b.queue[b.index]];
  document.getElementById('battle-num').textContent = `Q${q.id}`;
  document.getElementById('battle-question').textContent = q.question;
  document.getElementById('battle-input').value = '';
  document.getElementById('battle-feedback').className = 'feedback';
  document.getElementById('battle-feedback').textContent = '';
  updateBattleScore();
}

function submitBattle() {
  const bank = currentBank();
  if (state.battle.queue.length === 0) {
    resetBattle();
  }
  if (state.battle.index >= state.battle.queue.length) {
    state.battle.index = 0;
    state.battle.total = 0;
    state.battle.correct = 0;
  }
  const q = bank.questions[state.battle.queue[state.battle.index]];
  const input = document.getElementById('battle-input').value;
  const feedback = document.getElementById('battle-feedback');
  if (!input.trim()) {
    feedback.textContent = '请输入答案。';
    feedback.className = 'feedback wrong';
    return;
  }
  const result = compareAnswer(input, q.answer);
  state.battle.total += 1;
  if (result.score >= 0.5) {
    state.battle.correct += 1;
    feedback.textContent = '正确！';
    feedback.className = 'feedback correct';
  } else {
    feedback.textContent = `错误。标准答案：${q.answer}`;
    feedback.className = 'feedback wrong';
  }
  updateBattleScore();
  recordTrain(result.score >= 0.5);

  setTimeout(() => {
    state.battle.index += 1;
    if (state.battle.index >= state.battle.queue.length) {
      state.battle.index = 0;
      state.battle.queue = shuffle([...Array(bank.questions.length).keys()]);
      feedback.textContent += ' 本轮完成，已重新洗牌。';
    }
    renderBattle();
  }, 1400);
}

function nextBattle() {
  const bank = currentBank();
  if (state.battle.queue.length === 0) return;
  state.battle.index = (state.battle.index + 1) % state.battle.queue.length;
  if (state.battle.index === 0) {
    state.battle.queue = shuffle([...Array(bank.questions.length).keys()]);
  }
  renderBattle();
}

function updateBattleScore() {
  const rate = state.battle.total ? (state.battle.correct / state.battle.total) * 100 : 0;
  document.getElementById('battle-rate').textContent = `${Math.round(rate)}%`;
  document.getElementById('battle-score-fill').style.width = `${rate}%`;
}

function renderProfile() {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-correct').textContent = stats.correct;
  const rate = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
  document.getElementById('stat-rate').textContent = `${rate}%`;
  const thresholdInput = document.getElementById('study-threshold');
  if (thresholdInput) thresholdInput.value = study.threshold;
}

function compareAnswer(input, answer) {
  const norm = s => s.toLowerCase()
    // 第一步：把所有标点、符号统一替换为空格（中英文全覆盖）
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const inputText = norm(input);
  const answerText = norm(answer);
  if (!answerText) return { score: inputText.length > 0 ? 1 : 0 };
  if (!inputText) return { score: 0 };

  // 将标准答案按空格切分为关键词
  const keywords = answerText.split(/\s+/).filter(Boolean);
  if (keywords.length === 0) return { score: 1 };

  // 第一轮：精确包含匹配（关键词级别）
  let hit = 0;
  const matched = new Set();
  keywords.forEach((k, i) => {
    if (inputText.includes(k)) { hit += 1; matched.add(i); }
  });

  // 第二轮：对未命中的关键词做字符级模糊匹配
  const unmatchedIdx = keywords.map((_, i) => i).filter(i => !matched.has(i));
  if (unmatchedIdx.length > 0) {
    let fuzzyScore = 0;
    unmatchedIdx.forEach(i => {
      const k = keywords[i];
      // 短词（≤2字符）要求完全命中，长词允许部分重叠
      if (k.length <= 2) return;
      const overlap = charOverlapRatio(inputText, k);
      if (overlap >= 0.35) fuzzyScore += overlap; // 阈值降到35%
    });
    hit += fuzzyScore;
  }

  return { score: Math.min(hit / keywords.length, 1) };
}

/** 计算两个字符串的字符重叠比例（顺序敏感的 LCS 比率） */
function charOverlapRatio(a, b) {
  const m = a.length, n = b.length;
  if (m === 0 || n === 0) return 0;
  let prev = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    const curr = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      curr[j] = a[i - 1] === b[j - 1]
        ? prev[j - 1] + 1
        : Math.max(prev[j], curr[j - 1]);
    }
    prev = curr;
  }
  return prev[n] / Math.max(m, n);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============ AI 判题：配置存取 ============

function loadAIConfig() {
  const raw = localStorage.getItem(AI_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    aiConfig = {
      enabled: !!saved.enabled,
      autoSwitch: saved.autoSwitch !== false,
      currentProvider: saved.currentProvider || 'siliconflow',
      currentModel: saved.currentModel || 'Qwen/Qwen2.5-7B-Instruct',
      apiKeys: saved.apiKeys || {},
      usage: saved.usage || {}
    };
  } catch (e) {}
}

function saveAIConfig() {
  try {
    localStorage.setItem(AI_KEY, JSON.stringify(aiConfig));
  } catch (e) {}
}

// ============ AI 判题：额度计算 ============

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// 获取某 provider 的用量记录，自动按日重置每日型额度
function getUsage(provider) {
  const u = aiConfig.usage[provider] || { used: 0, date: '' };
  const cfg = AI_PROVIDERS[provider];
  if (!cfg) return { used: 0, date: todayStr() };
  if (cfg.quotaType.startsWith('daily_') && u.date !== todayStr()) {
    u.used = 0;
    u.date = todayStr();
  }
  aiConfig.usage[provider] = u;
  return u;
}

// 返回剩余额度比例 0~1
function quotaRemaining(provider) {
  const cfg = AI_PROVIDERS[provider];
  if (!cfg) return 0;
  const u = getUsage(provider);
  return Math.max(0, 1 - u.used / cfg.freeQuota);
}

// 判断某 provider 是否已耗尽
function isExhausted(provider) {
  return quotaRemaining(provider) <= 0;
}

// 记录一次调用的消耗
function recordUsage(provider, tokensOrCount, estimatedCny) {
  const cfg = AI_PROVIDERS[provider];
  if (!cfg) return;
  const u = getUsage(provider);
  switch (cfg.quotaType) {
    case 'daily_cny':
    case 'total_cny':
      u.used += estimatedCny || 0;
      break;
    case 'total_tokens':
      u.used += tokensOrCount || 0;
      break;
    case 'daily_requests':
      u.used += 1;
      break;
  }
  aiConfig.usage[provider] = u;
  saveAIConfig();
}

// 选择下一个有额度的 provider（自动切换）
function pickAvailableProvider() {
  const keys = Object.keys(AI_PROVIDERS);
  // 优先当前 provider
  if (!isExhausted(aiConfig.currentProvider) && aiConfig.apiKeys[aiConfig.currentProvider]) {
    return aiConfig.currentProvider;
  }
  for (const k of keys) {
    if (!isExhausted(k) && aiConfig.apiKeys[k]) return k;
  }
  return null;
}

// ============ AI 判题：调用各供应商 ============

const AI_JUDGE_PROMPT = `你是一个严格但公平的简答题阅卷老师。

【题目】
{question}

【标准答案】
{standard_answer}

【考生答案】
{user_answer}

请按以下标准评分：
1. 核心知识点覆盖率（60%）：答案是否包含标准答案中的关键概念/术语/要点
2. 表述准确性（25%）：是否有错误陈述、概念混淆
3. 完整性（15%）：是否答全了所有要点

输出严格为 JSON 格式，不要有额外文字：
{"score":0到1之间的小数,"correct":true或false,"feedback":"简短评语"}`;

function buildJudgeMessages(question, standardAnswer, userAnswer) {
  const content = AI_JUDGE_PROMPT
    .replace('{question}', question)
    .replace('{standard_answer}', standardAnswer)
    .replace('{user_answer}', userAnswer);
  return [
    { role: 'system', content: '你是一个简答题阅卷助手，只输出JSON。' },
    { role: 'user', content }
  ];
}

function parseAIResult(text) {
  if (!text) return null;
  // 提取 JSON
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const obj = JSON.parse(m[0]);
    if (typeof obj.score !== 'number') return null;
    return {
      score: Math.max(0, Math.min(1, obj.score)),
      correct: !!obj.correct,
      feedback: obj.feedback || ''
    };
  } catch (e) {
    return null;
  }
}

// OpenAI 兼容风格（硅基流动 / DeepSeek）
async function callOpenAIStyle(provider, model, messages) {
  const cfg = AI_PROVIDERS[provider];
  const key = aiConfig.apiKeys[provider];
  const res = await fetch(cfg.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 300 })
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${t.slice(0, 120)}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || '';
  const tokens = data.usage?.total_tokens || 0;
  return { content, tokens };
}

// 通义百炼 DashScope
async function callDashScope(provider, model, messages) {
  const cfg = AI_PROVIDERS[provider];
  const key = aiConfig.apiKeys[provider];
  const res = await fetch(`${cfg.endpoint}?model=${model}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      input: { messages },
      parameters: { temperature: 0.2, max_tokens: 300, result_format: 'message' }
    })
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${t.slice(0, 120)}`);
  }
  const data = await res.json();
  const content = data.output?.choices?.[0]?.message?.content || '';
  const tokens = data.usage?.total_tokens || 0;
  return { content, tokens };
}

// Google Gemini
async function callGemini(provider, model, messages) {
  const cfg = AI_PROVIDERS[provider];
  const key = aiConfig.apiKeys[provider];
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));
  const url = `${cfg.endpoint}/${model}:generateContent?key=${key}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.2, maxOutputTokens: 300 }
    })
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${t.slice(0, 120)}`);
  }
  const data = await res.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return { content, tokens: 1 }; // Gemini 免费档按次数计
}

async function callProvider(provider, model, messages) {
  const cfg = AI_PROVIDERS[provider];
  if (!cfg) throw new Error('未知供应商');
  switch (cfg.apiStyle) {
    case 'openai': return await callOpenAIStyle(provider, model, messages);
    case 'dashscope': return await callDashScope(provider, model, messages);
    case 'gemini': return await callGemini(provider, model, messages);
    default: throw new Error('不支持的 API 风格');
  }
}

// 估算单次调用的人民币成本（用于按元计额度的供应商）
function estimateCny(provider, tokens) {
  // 粗略估算：每百万 token 约 ¥1~¥2，这里取保守值
  if (provider === 'siliconflow') return (tokens / 1000000) * 2;
  if (provider === 'deepseek') return (tokens / 1000000) * 1.5;
  return 0;
}

/**
 * 用 AI 判题，带自动切换。
 * 返回 { score, correct, feedback, provider, model } 或 null（全部失败）
 */
async function judgeWithAI(question, standardAnswer, userAnswer) {
  const messages = buildJudgeMessages(question, standardAnswer, userAnswer);
  // 尝试顺序：当前 provider → 其他有额度的
  const tried = new Set();
  const tryOrder = [];
  if (aiConfig.apiKeys[aiConfig.currentProvider]) tryOrder.push(aiConfig.currentProvider);
  for (const k of Object.keys(AI_PROVIDERS)) {
    if (!tryOrder.includes(k) && aiConfig.apiKeys[k]) tryOrder.push(k);
  }

  for (const provider of tryOrder) {
    if (tried.has(provider)) continue;
    tried.add(provider);
    if (isExhausted(provider) && aiConfig.autoSwitch) continue;
    const cfg = AI_PROVIDERS[provider];
    const model = provider === aiConfig.currentProvider ? aiConfig.currentModel : cfg.models[0];
    try {
      const { content, tokens } = await callProvider(provider, model, messages);
      const result = parseAIResult(content);
      if (!result) throw new Error('AI 返回解析失败');
      // 记录消耗
      recordUsage(provider, tokens, estimateCny(provider, tokens));
      // 若当前 provider 耗尽且开启了自动切换，切到下一个
      if (isExhausted(provider) && aiConfig.autoSwitch) {
        const next = pickAvailableProvider();
        if (next) {
          aiConfig.currentProvider = next;
          aiConfig.currentModel = AI_PROVIDERS[next].models[0];
          saveAIConfig();
        }
      }
      return { ...result, provider, model };
    } catch (e) {
      // 429 / 配额类错误 → 标记耗尽并尝试下一个
      if (aiConfig.autoSwitch && (String(e.message).includes('429') || String(e.message).includes('quota') || String(e.message).includes('402'))) {
        const u = getUsage(provider);
        u.used = AI_PROVIDERS[provider].freeQuota;
        aiConfig.usage[provider] = u;
        saveAIConfig();
        continue;
      }
      // 其他错误也尝试下一个 provider
      if (aiConfig.autoSwitch) continue;
      throw e;
    }
  }
  return null;
}

// ============ AI 判题：仪表盘渲染 ============

function renderDashboard() {
  const enabledToggle = document.getElementById('ai-enabled-toggle');
  const enabledText = document.getElementById('ai-enabled-text');
  const autoSwitchToggle = document.getElementById('ai-autoswitch-toggle');
  const autoSwitchText = document.getElementById('ai-autoswitch-text');
  const providerList = document.getElementById('provider-list');
  const statusEl = document.getElementById('ai-status');
  if (!enabledToggle) return;

  enabledToggle.setAttribute('aria-pressed', String(aiConfig.enabled));
  enabledText.textContent = aiConfig.enabled ? '已开启' : '已关闭';
  autoSwitchToggle.setAttribute('aria-pressed', String(aiConfig.autoSwitch));
  autoSwitchText.textContent = aiConfig.autoSwitch ? '已开启' : '已关闭';

  // 渲染供应商列表
  providerList.innerHTML = '';
  Object.entries(AI_PROVIDERS).forEach(([key, cfg]) => {
    const u = getUsage(key);
    const remaining = quotaRemaining(key);
    const exhausted = isExhausted(key);
    const isCurrent = key === aiConfig.currentProvider;
    const hasKey = !!aiConfig.apiKeys[key];

    const item = document.createElement('div');
    item.className = 'provider-item';
    if (isCurrent && hasKey && !exhausted) item.classList.add('active');
    if (exhausted) item.classList.add('exhausted');

    // 标签
    let tagHtml = '';
    if (isCurrent && hasKey && !exhausted) tagHtml = '<span class="provider-tag current">当前</span>';
    else if (exhausted) tagHtml = '<span class="provider-tag exhausted">已耗尽</span>';
    else if (!hasKey) tagHtml = '<span class="provider-tag">未配置</span>';
    else tagHtml = '<span class="provider-tag">可用</span>';

    // 模型按钮
    const modelsHtml = cfg.models.map(m => {
      const active = (key === aiConfig.currentProvider && m === aiConfig.currentModel) ? 'active' : '';
      return `<button class="provider-model-btn ${active}" data-provider="${key}" data-model="${m}">${m}</button>`;
    }).join('');

    // 额度
    const usedPct = Math.min(100, (u.used / cfg.freeQuota) * 100);
    const remainingPct = Math.max(0, 100 - usedPct);
    const warnClass = remaining < 0.2 ? 'warn' : '';
    let usedDisplay = u.used;
    if (cfg.quotaType.endsWith('_cny')) usedDisplay = `¥${u.used.toFixed(2)}`;
    else if (cfg.quotaType.endsWith('_tokens')) usedDisplay = `${Math.round(u.used)} tok`;
    else if (cfg.quotaType.endsWith('_requests')) usedDisplay = `${Math.round(u.used)} 次`;

    let quotaDisplay = cfg.quotaLabel;
    if (cfg.quotaType.endsWith('_cny')) quotaDisplay = `¥${cfg.freeQuota}`;
    else if (cfg.quotaType.endsWith('_tokens')) quotaDisplay = `${cfg.freeQuota} tok`;
    else if (cfg.quotaType.endsWith('_requests')) quotaDisplay = `${cfg.freeQuota} 次`;

    item.innerHTML = `
      <div class="provider-head">
        <span class="provider-name">${cfg.name}</span>
        ${tagHtml}
      </div>
      <div class="provider-models">${modelsHtml}</div>
      <div class="provider-key-row">
        <input class="provider-key-input" type="password" placeholder="API Key" data-provider="${key}" value="${hasKey ? (aiConfig.apiKeys[key] || '') : ''}">
        <button class="provider-activate-btn" data-provider="${key}">设为当前</button>
      </div>
      <div class="provider-quota">
        额度：${usedDisplay} / ${quotaDisplay}（剩余 ${Math.round(remainingPct)}%）
        <div class="quota-bar"><div class="quota-fill ${warnClass}" style="width:${remainingPct}%"></div></div>
      </div>
    `;
    providerList.appendChild(item);
  });

  // 状态
  if (!aiConfig.enabled) {
    statusEl.textContent = 'AI 判题未开启';
  } else {
    const cur = AI_PROVIDERS[aiConfig.currentProvider];
    const hasKey = !!aiConfig.apiKeys[aiConfig.currentProvider];
    const exhausted = isExhausted(aiConfig.currentProvider);
    if (!hasKey) {
      statusEl.innerHTML = '当前供应商未配置 API Key，请在上方填写。';
    } else if (exhausted) {
      const next = aiConfig.autoSwitch ? pickAvailableProvider() : null;
      statusEl.innerHTML = next
        ? `当前供应商已耗尽，已自动切换到「${AI_PROVIDERS[next].name}」。`
        : '当前供应商已耗尽，且无其他可用供应商。';
    } else {
      statusEl.innerHTML = `当前：${cur.name} / ${aiConfig.currentModel}（剩余 ${Math.round(quotaRemaining(aiConfig.currentProvider) * 100)}%）`;
    }
  }
}

// ============ AI 判题：仪表盘事件绑定 ============

function bindDashboardEvents() {
  const enabledToggle = document.getElementById('ai-enabled-toggle');
  enabledToggle.addEventListener('click', () => {
    aiConfig.enabled = !aiConfig.enabled;
    saveAIConfig();
    renderDashboard();
  });

  const autoSwitchToggle = document.getElementById('ai-autoswitch-toggle');
  autoSwitchToggle.addEventListener('click', () => {
    aiConfig.autoSwitch = !aiConfig.autoSwitch;
    saveAIConfig();
    renderDashboard();
  });

  const providerList = document.getElementById('provider-list');
  // 模型切换
  providerList.addEventListener('click', e => {
    const modelBtn = e.target.closest('.provider-model-btn');
    if (modelBtn) {
      aiConfig.currentProvider = modelBtn.dataset.provider;
      aiConfig.currentModel = modelBtn.dataset.model;
      saveAIConfig();
      renderDashboard();
      return;
    }
    const activateBtn = e.target.closest('.provider-activate-btn');
    if (activateBtn) {
      const provider = activateBtn.dataset.provider;
      const input = providerList.querySelector(`.provider-key-input[data-provider="${provider}"]`);
      if (input && input.value.trim()) {
        aiConfig.apiKeys[provider] = input.value.trim();
      }
      aiConfig.currentProvider = provider;
      if (!aiConfig.currentModel || !AI_PROVIDERS[provider].models.includes(aiConfig.currentModel)) {
        aiConfig.currentModel = AI_PROVIDERS[provider].models[0];
      }
      saveAIConfig();
      renderDashboard();
    }
  });
  // API Key 输入实时保存
  providerList.addEventListener('change', e => {
    if (e.target.classList.contains('provider-key-input')) {
      const provider = e.target.dataset.provider;
      aiConfig.apiKeys[provider] = e.target.value.trim();
      saveAIConfig();
      renderDashboard();
    }
  });
}

// 底部导航自动隐去
function initNavAutoHide() {
  const nav = document.getElementById('bottom-nav');
  const toggle = document.getElementById('nav-autohide-toggle');
  let timer = null;
  // 自动隐藏默认开启；开关默认关闭（即不固定导航栏）
  let autoHideEnabled = true;

  try {
    if (localStorage.getItem('nav_autohide') === 'off') autoHideEnabled = false;
  } catch (e) {}

  function hide() {
    if (!autoHideEnabled) return;
    nav.classList.add('hidden-nav');
  }
  function show() {
    nav.classList.remove('hidden-nav');
    clearTimeout(timer);
    if (autoHideEnabled) timer = setTimeout(hide, 2200);
  }

  // 判断指针是否进入导航栏所在的屏幕边缘区域
  function inEdgeZone(x, y) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w >= 1024) {
      // 桌面端：导航栏在左侧
      return x <= 24;
    }
    // 移动/平板端：导航栏在底部
    return y >= h - 24;
  }

  // 仅当鼠标移到特定边缘区域，或在导航栏上方时才弹出
  document.addEventListener('mousemove', e => {
    if (inEdgeZone(e.clientX, e.clientY)) show();
  });
  document.addEventListener('touchstart', e => {
    const t = e.touches[0];
    if (t && inEdgeZone(t.clientX, t.clientY)) show();
  }, { passive: true });
  nav.addEventListener('mouseenter', show);
  nav.addEventListener('mousemove', show);
  nav.addEventListener('touchstart', show, { passive: true });

  function applyToggleState() {
    if (autoHideEnabled) {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.title = '固定导航栏（关闭自动隐藏）';
      clearTimeout(timer);
      timer = setTimeout(hide, 2200);
    } else {
      toggle.classList.add('active');
      toggle.setAttribute('aria-pressed', 'true');
      toggle.title = '恢复自动隐藏导航栏';
      clearTimeout(timer);
      nav.classList.remove('hidden-nav');
    }
  }

  // 切换自动隐藏开关
  toggle.addEventListener('click', () => {
    autoHideEnabled = !autoHideEnabled;
    try {
      localStorage.setItem('nav_autohide', autoHideEnabled ? 'on' : 'off');
    } catch (e) {}
    applyToggleState();
  });

  applyToggleState();
}

init();
