using Streamish.Controllers;
using Streamish.Models;
using Streamish.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using Streamish.Test.Mocks;

namespace Streamish.Test
{
    public class UserProfileControllerTest
    {
        [Fact]
        public void Get_Returns_All_UserProfiles()
        {
            var profileCount = 20;
            var profiles = CreateTestProfiles(profileCount);

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfiles = Assert.IsType<List<UserProfile>>(okResult.Value);
        }

        [Fact]
        public void Get_By_Id_Returns_NotFound_When_Given_Unknown_id()
        {
            var profiles = new List<UserProfile>();

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get(1);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Post_Method_Adds_A_New_Video()
        {
            var profileCount = 20;
            var profiles = CreateTestProfiles(profileCount);

            var repo = new InMemoryUserProfileRepository(profiles);
            var controler = new UserProfileController(repo);

            var newProfile = new UserProfile()
            {
               
                Name = $"Name",
                Email = $"user@example.com",
                DateCreated = DateTime.Today,
                ImageUrl = $"http://user.url/999",
            };

            controler.Post(newProfile);

            Assert.Equal(profileCount + 1, repo.InternalData.Count);

        }
        private List<UserProfile> CreateTestProfiles(int count)
        {
            var profiles = new List<UserProfile>();
            for (var i = 1; i <= count; i++)
            {
                profiles.Add(new UserProfile()
                {
                    Id = i,
                    Name = $"User {i}",
                    Email = $"user{i}@example.com",
                    DateCreated = DateTime.Today.AddDays(-i),
                    ImageUrl = $"http://user.url/{i}",

                });
            }
            return profiles;
        }

    }
}
