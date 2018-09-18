var qiniu = require("qiniu");
var express = require("express");
var util = require("util");
var path = require("path")
var request = require("request");
var app = express();
app.use(express.static(__dirname + "/"));
var multiparty = require("multiparty");

var fs=require('fs');
var config=JSON.parse(fs.readFileSync(path.resolve(__dirname,"config.json")));

var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
var config2 = new qiniu.conf.Config();
// 这里主要是为了用 node sdk 的 form 直传，结合 demo 中 form 方式来实现无刷新上传
config2.zone = qiniu.zone.Zone_z2;
var formUploader = new qiniu.form_up.FormUploader(config2);
var putExtra = new qiniu.form_up.PutExtra();
var options = {
  scope: config.Bucket,
  deleteAfterDays: 1,
  returnBody:
    '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
};

var putPolicy = new qiniu.rs.PutPolicy(options);
var bucketManager = new qiniu.rs.BucketManager(mac, null);

app.get("/api/uptoken", function(req, res, next) {
  var token = putPolicy.uploadToken(mac);
  res.header("Cache-Control", "max-age=0, private, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  res.header("Access-Control-Allow-Origin", "*");
  if (token) {
    res.json({
      uptoken: token,
      domain: config.Domain
    });
  }
});

app.post("/api/transfer", function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var path = files.file[0].path;
    var token = fields.token[0];
    var key = fields.key[0];
    formUploader.putFile(token, key, path, putExtra, function(
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        console.log(respErr);
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        res.send('<script>window.parent.showRes('+JSON.stringify(respBody)+')</script>');
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
  });
});

app.listen(config.Port, function() {
  console.log("Listening on port %d\n", config.Port);
  console.log(
    "▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽  Demos  ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽"
  );
  console.log(
    "△ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △\n"
  );
});
