
const buildProfilator = require("../index");
const test = require("ava");

test("Save time samples", async function (t) {
  const profilator = buildProfilator();

  profilator.start("test01");
  await new Promise(res => setTimeout(res, 200));
  profilator.stop("test01");


  profilator.start("test01");
  await new Promise(res => setTimeout(res, 200));
  profilator.stop("test01");

  const test01TimeEllapsed = profilator.getTotalTimeEllapsed("test01")
  t.true(test01TimeEllapsed >= 400, `Time ellapsed (${test01TimeEllapsed}) should be greater or equal than 400 ms`);
});

test("Build results report", async function (t) {
  const profilator = buildProfilator();
  
  profilator.start("test02");
  await new Promise(res => setTimeout(res, 10));
  profilator.stop("test02");
  profilator.start("test03 super long label");
  await new Promise(res => setTimeout(res, 30));
  profilator.stop("test03 super long label");

  const [_, totalLine, test03Line, test02Line] = profilator.buildResultsReport().split("\n");
  t.truthy(totalLine.match(/TOTAL TIME          [0-9]+ ms/), "First the total time line");
  t.truthy(test03Line.match(/test03 super long...[0-9]+ ms \([0-9]+ %\)/), "Then the greatest time spent label");
  t.truthy(test02Line.match(/test02              [0-9]+ ms \([0-9]+ %\)/), "Finally the lowest value");
});

test("Build results report title", function (t) {
  const profilatorNoName = buildProfilator();
  const profilatorTest01 = buildProfilator("Test 01");
  const [titleNoName] = profilatorNoName.buildResultsReport().split("\n");
  const [titleTest01] = profilatorTest01.buildResultsReport().split("\n");
  t.is(titleNoName, "# Profilator session");
  t.is(titleTest01, "# Profilator session: Test 01");
});

test("Get times ellapsed", async function (t) {
  const profilator = buildProfilator();

  profilator.start("test04");
  await new Promise(res => setTimeout(res, 50));
  profilator.stop("test04");
  const test04TimeEllapsed = profilator.getTimeEllapsed("test04");
  t.true(test04TimeEllapsed >= 50, `test04 time ellapsed (${test04TimeEllapsed}) should be at least 50`);

  profilator.start("test05");
  await new Promise(res => setTimeout(res, 50));
  profilator.stop("test05");
  const totalTimeEllapsed = profilator.getTotalTimeEllapsed();
  t.true(totalTimeEllapsed >= 100, `Total time (${totalTimeEllapsed}) should be at least 100`);
});
