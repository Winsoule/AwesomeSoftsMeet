using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AwesomeSoftsMeet.Models
{
    public class Room
    {
       
        public string RoomName { get; set; }

        public static Meeting MakeMeeting(DateTime Start, DateTime End, string RoomName, string Attendants)
        {
            Meeting newMeeting = new Meeting
            {
                Starttime = Start,
                Endtime = End,
                RoomName = RoomName,
                Attendants = new List<Attendant>()
            };

            List<string> AttendantList = Attendants.Split(',').ToList();

            foreach (string s in AttendantList)
            {
                
                if (s.Contains('@') && s.Contains('.') && !s.Contains(' '))
                {
                    if (s.IndexOf('@') < s.LastIndexOf('.') && s.LastIndexOf('.') != s.Length - 1)
                    {
                        newMeeting.Attendants.Add(new Attendant() { Email = s });
                    }
                }
                else if(s.Contains(' ') && !s.Contains('@'))
                {
                    List<string> TempNameList = s.Split(' ').ToList();
                    if(TempNameList.Count == 2) newMeeting.Attendants.Add(new Attendant() { FirstName = TempNameList[0], LastName = TempNameList[1] });
                    else
                    {
                        string TempLastName = "";
                        for ( int i = 1; i == TempNameList.Count; i++, TempLastName += " ")
                        {
                            TempLastName += TempNameList[i];
                        }
                        newMeeting.Attendants.Add(new Attendant() { FirstName = TempNameList[0], LastName = TempLastName });
                    }
                }
                else
                { newMeeting.Attendants.Add(new Attendant() { Email = s }); }
            }

            return newMeeting;
        }
    }
}
