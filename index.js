
const buildProfilator = function buildProfilator () {

  const timers = [];

  const getTimer = function getTimer (label) {
    const [existingTimer] = timers.filter(t => t.label === label);
    if (existingTimer) {
      return existingTimer;
    } else {
      const newTimer = { label, ellapsedMillis: 0 };
      if (!existingTimer) timers.push(newTimer);
      return newTimer;
    }
  };

  const start = label => getTimer(label).timestamp = new Date();

  const stop = function stop (label) {
    const timer = getTimer(label);
    timer.ellapsedMillis += new Date() - timer.timestamp;
  };

  const getTotalTimeEllapsed = () => timers.reduce((acc, curr) => acc + curr.ellapsedMillis, 0);
  const getTimeEllapsed = label => getTimer(label).ellapsedMillis;

  const buildReportLabel = function buildReportLabel (text) {
    if (text.length > 20) {
      return `${text.substring(0, 17)}...`;
    } else {
      return `${text}                    `.substring(0, 20);
    }
  };

  const buildResultsReport = function buildResultsReport () {
    const totalTimeEllapsed = getTotalTimeEllapsed();
    return timers.sort((t1, t2) => t2.ellapsedMillis - t1.ellapsedMillis).reduce(function (report, timer) {
      const percent = totalTimeEllapsed !== 0 ? Math.round(timer.ellapsedMillis / totalTimeEllapsed * 100) : 0;
      const label = buildReportLabel(timer.label);
      return `${report}${label}${timer.ellapsedMillis} ms (${percent} %)\n`;
    }, `TOTAL TIME          ${totalTimeEllapsed} ms\n`);
  };

  return {
    buildResultsReport,
    getTimeEllapsed,
    getTotalTimeEllapsed,
    start,
    stop
  }
};

module.exports = buildProfilator;
