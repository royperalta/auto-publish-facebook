import FB from 'fb';
import fs from 'fs'; //
import Model from '../models/posterModel.js'
async function publicarFacebook(codigo, title, content, URL) {
  console.log(codigo, URL)
  try {
    (await import('dotenv')).config({ path: ".env" })
    FB.api(
      `/${process.env.ID_PAGE}/photos`,
      `POST`,
      {
        "source": fs.createReadStream(`screen/${codigo}.jpg`),
        //caption: 'My vacation'`}`,
        "message": `${title} \n \n \n \n \n \n más información en el comentario`,
        //"published": "false",
        //"scheduled_publish_time": `${fecha.toLocaleDateString()}T${hora}:00-05:00`,
        //"scheduled_publish_time":`${h}-05:00`,
        "access_token": `${process.env.TOKEN_FACEBOOK}`
      },
      async function (response) {
        if (response.error) {
          console.log("Error")
          console.log(response)
          return response.error
        } else {
          const { link } = await Model.findOne({ title: `${title}` })
          try {
            const { id } = response
            FB.api(
              `/${id}/comments`,
              "POST",
              {
                "message": `${link}`,
                "access_token": `${process.env.TOKEN_FACEBOOK}`
              },
              function (response) {
                if (response && !response.error) {
                  /* handle the result */
                  console.log(response)
                } else {
                  console.log(response)
                }
              }
            );
            const save = await Model.findByIdAndUpdate(codigo, { $set: { estado_facebook: "true" } })
            console.log(save)
            if (save) {
              console.log(response)
              return codigo
            }
          } catch (e) { console.log(e) }
        }
      }
    )
  } catch (e) {
    return console.log(e)
  }
}

export default publicarFacebook