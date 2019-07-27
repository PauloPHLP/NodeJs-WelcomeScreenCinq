const GlobalHelpers = require('./GlobalHelpers');
const HBSHelpers = require('./HBSHelpers');

module.exports = {
  ProgrammedWelcomeScreen: ws => {
    return `
      <div class="col-xs-6 col-sm-6 col-md-6">
        <div class="form-group flt_center">
          <input type="checkbox" name="startScheduleWs" id="startScheduleWs" checked>
          <label for="startScheduleWs">This welcome screen is schedule to:</label>
          <input type='text' name="startDate" id="startDate" class="datepicker-here form-control input-sm" data-position="top center" data-language='en' data-timepicker="true" placeholder="Start time" value="${GlobalHelpers.FormatDate(ws.startDate)}"/>
        </div>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6">
        <div class="form-group flt_center">
          <input type="checkbox" class="vsb_hidden">
          <label for="finishScheduleWs">Until:</label>
          <input type='text' name="endDate" id="endDate" class="datepicker-here form-control input-sm" data-position="top center" data-language='en' data-timepicker="true" placeholder="Finish time" value="${GlobalHelpers.FormatDate(ws.endDate)}"/>
        </div>
      </div>
    `;
  },

  ActivetedWelcomeScreen: ws => {
    return `
      <div class="col-xs-6 col-sm-6 col-md-6">
        <div class="form-group flt_center">
          <input type="checkbox" name="startScheduleWs" id="startScheduleWs">
          <label for="startScheduleWs">This welcome screen is schedule to:</label>
          <input type='text' name="startDate" id="startDate" class="datepicker-here form-control input-sm" data-position="top center" data-language='en' data-timepicker="true" placeholder="Start time" disabled/>
        </div>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6">
        <div class="form-group flt_center">
          <input type="checkbox" class="vsb_hidden">
          <label for="finishScheduleWs">Until:</label>
          <input type='text' name="endDate" id="endDate" class="datepicker-here form-control input-sm" data-position="top center" data-language='en' data-timepicker="true" placeholder="Finish time" disabled/>
        </div>
      </div>
    `;
  },

  ProgrammedWelcomeScreen: ws => {
    return `
      <div class="col-xs-6 col-sm-6 col-md-6">
        <div class="form-group flt_center">
          <input type="checkbox" name="startScheduleWs" id="startScheduleWs" checked>
          <label for="startScheduleWs" class="releway-font">This welcome screen is schedule to:</label>
          <input type='text' name="startDate" id="startDate" class="datepicker-here form-control input-sm" data-position="top center" data-language='en' data-timepicker="true" placeholder="Start time" value="${GlobalHelpers.FormatDate(ws.startDate)}"/>
        </div>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6">
        <div class="form-group flt_center">
          <input type="checkbox" class="vsb_hidden">
          <label for="finishScheduleWs" class="releway-font">Until:</label>
          <input type='text' name="endDate" id="endDate" class="datepicker-here form-control input-sm" data-position="top center" data-language='en' data-timepicker="true" placeholder="Finish time" value="${GlobalHelpers.FormatDate(ws.endDate)}"/>
        </div>
      </div>
    `;
  },

  DisabledWelcomeScreen: ws => {
    return `
      <div class="col-xs-6 col-sm-6 col-md-6">
        <div class="form-group flt_center">
          <input type="checkbox" name="startScheduleWs" id="startScheduleWs">
          <label for="startScheduleWs">This welcome screen is schedule to:</label>
          <input type='text' name="startDate" id="startDate" class="datepicker-here form-control input-sm" data-position="top center" data-language='en' data-timepicker="true" placeholder="Start time" disabled/>
        </div>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6">
        <div class="form-group flt_center">
          <input type="checkbox" class="vsb_hidden">
          <label for="finishScheduleWs">Until:</label>
          <input type='text' name="endDate" id="endDate" class="datepicker-here form-control input-sm" data-position="top center" data-language='en' data-timepicker="true" placeholder="Finish time" disabled/>
        </div>
      </div>
    `;
  },

  ShowVideos: (videos, isAdmin) => {
    let toReturn = '';
    videos.forEach(video => {
      if (isAdmin) {
        toReturn += `
          <tr>
            <td class="releway-font ellipsis">${video.title}</td>
            <td class="releway-font ellipsis">${video.date}</td>
            ${GlobalHelpers.CheckAvailability(video)}
            <td>
              <a href="/edit_welcome_screen_video/${video.id}" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
              <a class="deleteVideo" title="Delete" data-toggle="tooltip" onclick="DeleteVideo('${video.id}');"><i class="material-icons delete-icon">&#xE872;</i></a>
            </td>
          </tr>
        `
      } else if (!isAdmin) {
        if (!video.isDefaultVideo) {
          toReturn += `
            <tr>
              <td class="releway-font ellipsis">${video.title}</td>
              <td class="releway-font ellipsis">${video.date}</td>
              ${GlobalHelpers.CheckAvailability(video)}
              <td>
                <a href="/edit_welcome_screen_video/${video.id}" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                <a class="deleteVideo" title="Delete" data-toggle="tooltip" onclick="DeleteVideo('${video.id}');"><i class="material-icons delete-icon">&#xE872;</i></a>
              </td>
            </tr>
          ` 
        }
      }
    });

    return toReturn;
  },

  ImageList: image => {
    return `
      <section>
        <img class="current_image" id="current_image" src="/uploads/${image.imageName}"/>
        <ul class="list-group row guests_list">
          ${GlobalHelpers.CompanyList(image.companies[0])}
          ${GlobalHelpers.CompanyList(image.companies[1])}
          ${GlobalHelpers.GuestList(image.guestsNames)}
        </ul>
      </section>
    `;
  },

  VideoList: video => {
    return `
      <section>
        <video class="current_video_with_nav" id="current_video" autoplay loop muted preload>
          <source src="/uploads/${video.videoName}" type="video/mp4"></source>
        </video>
      </section>
    `;
  }
}