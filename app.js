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

let state = {
  currentBankId: '',
  banks: {},
  reviewIndex: 0,
  memoryIndex: 0,
  battle: { queue: [], index: 0, total: 0, correct: 0 }
};

let stats = { total: 0, correct: 0, lastDate: '', today: 0 };
let study = { sessions: [], threshold: 60, totalSeconds: 0, startTime: 0, committed: false };

function init() {
  loadStats();
  initStudy();
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
      current.answer = line.slice(8, end).trim();
    } else if (line.startsWith('[explain:')) {
      const end = line.endsWith(']') ? line.length - 1 : line.length;
      current.explain = line.slice(9, end).trim();
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
  const memoryEye = document.getElementById('memory-eye');
  const memoryAnswerWrap = document.getElementById('memory-answer-wrap');
  memoryEye.addEventListener('mouseenter', () => {
    memoryAnswerWrap.classList.remove('hidden');
    memoryEye.classList.add('show');
  });
  memoryEye.addEventListener('mouseleave', () => {
    memoryAnswerWrap.classList.add('hidden');
    memoryEye.classList.remove('show');
  });
  memoryEye.addEventListener('click', () => {
    memoryAnswerWrap.classList.toggle('hidden');
    memoryEye.classList.toggle('show');
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
}

function moveMemory(dir) {
  const bank = currentBank();
  if (bank.questions.length === 0) return;
  state.memoryIndex = (state.memoryIndex + dir + bank.questions.length) % bank.questions.length;
  renderMemory();
}

function judgeMemory() {
  const bank = currentBank();
  if (bank.questions.length === 0) return;
  const q = bank.questions[state.memoryIndex];
  const input = document.getElementById('memory-input');
  const feedback = document.getElementById('memory-feedback');
  const reveal = document.getElementById('memory-reveal');
  const answerWrap = document.getElementById('memory-answer-wrap');
  const resetBtn = document.getElementById('btn-memory-reset');

  if (!input.value.trim()) {
    feedback.textContent = '请先输入答案再判断。';
    feedback.className = 'feedback wrong';
    reveal.classList.remove('hidden');
    answerWrap.classList.add('hidden');
    document.getElementById('memory-eye').classList.remove('show');
    return;
  }

  const result = compareAnswer(input.value, q.answer);
  reveal.classList.remove('hidden');
  answerWrap.classList.add('hidden'); // 默认隐藏答案，需悬停/点击眼睛查看
  document.getElementById('memory-eye').classList.remove('show');

  if (result.score >= 0.8) {
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
    .replace(/[，。！？、；：""''（）()\[\]【】]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const inputText = norm(input);
  const answerText = norm(answer);
  // 将标准答案按空格/标点切分为关键词，检查用户答案包含多少关键词
  const keywords = answerText.split(/\s+/).filter(Boolean);
  if (keywords.length === 0) return { score: inputText.length > 0 ? 1 : 0 };
  let hit = 0;
  keywords.forEach(k => {
    if (inputText.includes(k)) hit += 1;
  });
  return { score: Math.min(hit / keywords.length, 1) };
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 底部导航自动隐去
function initNavAutoHide() {
  const nav = document.getElementById('bottom-nav');
  let timer = null;
  function hide() {
    nav.classList.add('hidden-nav');
  }
  function show() {
    nav.classList.remove('hidden-nav');
    clearTimeout(timer);
    timer = setTimeout(hide, 2200);
  }
  document.addEventListener('mousemove', show);
  document.addEventListener('scroll', show);
  document.addEventListener('touchstart', show);
  timer = setTimeout(hide, 2200);
}

init();
