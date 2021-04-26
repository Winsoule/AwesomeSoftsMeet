using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AwesomeSoftsMeet.Models
{
    public class Meeting : Room
    {
        public int Id { get; set; }
        public DateTime Starttime { get; set; }
        public DateTime Endtime { get; set; }

        
        public List<Attendant> Attendants { get; set; }

        public void EndMeeting()
        {
            
        }
    }  
}
