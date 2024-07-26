using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webAPI.Data;
using webAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace webAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentsController(AppDbContext context) {
            _context = context;

        }

        [HttpGet]
        public async Task<IEnumerable<Student>> getStudents(){
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Student student){
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            await _context.AddAsync(student);

            var result = await _context.SaveChangesAsync();

            if (result > 0) {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id){
            var student = await _context.Students.FindAsync(id);
            if (student == null){
                return NotFound();
            }
            _context.Remove(student);
            var result = await _context.SaveChangesAsync();
            if (result > 0) {
                return Ok("Student was deleted successfully");
            }
            return BadRequest();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Student>> GetStudents(int id){
            var student = await _context.Students.FindAsync(id);
            if (student == null){
                return NotFound();
            }
            return Ok(student);
        }
        

        [HttpPut("{id:int}")]
        public async Task<IActionResult> EditStudent(int id, Student student){
            
            var thisStudent = await _context.Students.FindAsync(id);

            if (thisStudent == null){
                return NotFound();
            }
            thisStudent.Address = student.Address;
            thisStudent.Email = student.Email;
            thisStudent.Name = student.Name;
            thisStudent.PhoneNumber = student.PhoneNumber;
            
            var result = await _context.SaveChangesAsync();
            if (result > 0) {
                return Ok("Student was updated successfully");
            }
            return BadRequest();
        }
        
    }
}