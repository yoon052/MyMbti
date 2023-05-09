const url = "hyemburgerworld.github.io/SOJU-study/4-1";

function setShare() {
  let resultImg = document.querySelector("#resultImg");
  let resultAlt = resultImg.firstElementChild.alt;
  const shareTitle = "십이간지 연애유형 결과";
  const shareDes = infoList[resultAlt].name;
  const shareImage = url + "img/image-" + resultAlt + ".png";
  const shareURL = url + "page/result-" + resultAlt + ".html";

  Kakao.API.request({
    url: "/v2/api/talk/memo/default/send",
    data: {
      receiver_uuids: ["${RECEIVER_UUID}"],
      template_object: {
        object_type: "feed",
        content: {
          title: shareTitle,
          description: shareDes,
          image_url: shareImage,
          link: {
            web_url: shareURL,
            mobile_web_url: shareURL,
          },
        },
        buttons: [
          {
            title: "결과 확인",
            link: {
              mobile_web_url: shareURL,
              web_url: shareURL,
            },
          },
        ],
      },
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
