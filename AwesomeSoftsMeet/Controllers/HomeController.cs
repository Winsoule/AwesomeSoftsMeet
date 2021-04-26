using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AwesomeSoftsMeet.Models;

namespace AwesomeSoftsMeet.Controllers
{
	public class HomeController : Controller
	{
		private static readonly IList<Meeting> _meetings;

		static HomeController()
		{
			_meetings = new List<Meeting>();

			_meetings.Add(Room.MakeMeeting(new System.DateTime(2021, 04, 27, 16, 00, 00), new System.DateTime(2021, 04, 27, 17, 00, 00), "jg334", "j.hoengaard@gmail.com, aohge@gien.com, oijrgr@gaipn.dk"));
		}

		public ActionResult Index()
		{
			return View(_meetings);
		}

		[Route("meetings")]
		[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
		public ActionResult Meetings()
		{
			return Json(_meetings);
		}

		[Route("meetings/new")]
		[HttpPost]
		[Consumes("application/json")]
		public ActionResult AddMeeting([FromBody]MeetingPost meeting)
		{
			Meeting newMeeting = Room.MakeMeeting(
				new System.DateTime(int.Parse(meeting.year), int.Parse(meeting.month), int.Parse(meeting.day), int.Parse(meeting.sTimeHour), int.Parse(meeting.sTimeMin), 00),
				new System.DateTime(int.Parse(meeting.year), int.Parse(meeting.month), int.Parse(meeting.day), int.Parse(meeting.eTimeHour), int.Parse(meeting.eTimeMin), 00),
				meeting.room, meeting.email);
			newMeeting.Id = _meetings.Count + 1;
			_meetings.Add(newMeeting);
			return Content("Success :)");
		}
	}
}
