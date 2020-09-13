using System.Threading.Tasks;
using SocialApp.API.Models;

namespace SocialApp.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(Models.User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}