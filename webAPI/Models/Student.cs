using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class Student
    {
        public int Id {get;set;}
        public string? Name {get;set;}
        public string? Address {get;set;}
        public string? PhoneNumber {get;set;}
        public string? Email {get;set;}
    }
}