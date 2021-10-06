using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Streamish.Repositories;
using Streamish.Models;

namespace Streamish.Test.Mocks
{
    class InMemoryUserProfileRepository : IUserProfileRepository
    {

        private readonly List<UserProfile> _data;

        public List<UserProfile> InternalData
        {
            get
            {
                return _data;
            }
        }

        public InMemoryUserProfileRepository(List<UserProfile> startingData)
        {
            _data = startingData;
        }

        public void Add(UserProfile userProfile)
        {
            var lastProfile = _data.Last();
            userProfile.Id = lastProfile.Id + 1;
            _data.Add(userProfile);
        }

        public void Delete(int id)
        {
            var profileToDelete = _data.FirstOrDefault(p => p.Id == id);
            if (profileToDelete == null)
            {
                return;
            }

            _data.Remove(profileToDelete);
        }

        public List<UserProfile> GetAll()
        {
            return _data;
        }

        public UserProfile GetById(int id)
        {
            return _data.FirstOrDefault(p => p.Id == id);
        }

        public void Update(UserProfile userProfile)
        {
            var currentProfile = _data.FirstOrDefault(p => p.Id == userProfile.Id);
            if (currentProfile == null)
            {
                return;
            }

            currentProfile.Name = userProfile.Name;
            currentProfile.Email = userProfile.Email;
            currentProfile.DateCreated = userProfile.DateCreated;
            currentProfile.ImageUrl = userProfile.ImageUrl;
            
        }


    }
}
