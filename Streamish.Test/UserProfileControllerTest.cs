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
        public void Get_By_Id_Returns_NotFound_When_Given_Unknown_Id()
        {
            var profiles = new List<UserProfile>();

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get(1);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]

        public void Get_By_Id_Returns_Video_With_Given_Id()
        {
            var testProfileId = 99;
            var profiles = CreateTestProfiles(5);
            profiles[0].Id = testProfileId;

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get(testProfileId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfile = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testProfileId, actualProfile.Id);
        
        }

        [Fact]
        public void Put_Method_Returns_BadRequest_When_Ids_Do_Not_Match()
        {
            var testProfileId = 99;
            var profiles = CreateTestProfiles(5);
            profiles[0].Id = testProfileId;

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            var profileToUpdate = new UserProfile()
            {
                Id = testProfileId,
                Name = "Updated!",
                Email = "Updated!",
                DateCreated = DateTime.Today,
                ImageUrl = $"http://user.url/999",
            };

            var someOtherProfileId = testProfileId + 1;

            var result = controller.Put(someOtherProfileId, profileToUpdate);

            Assert.IsType<BadRequestResult>(result);

        }

        [Fact]
        public void Put_Method_Updates_A_User_Profile()
        {
           
            var testProfileId = 99;
            var profiles = CreateTestProfiles(5);
            profiles[0].Id = testProfileId; 

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            var profileToUpdate = new UserProfile()
            {
                Id = testProfileId,
                Name = $"Name",
                Email = $"user@example.com",
                DateCreated = DateTime.Today,
                ImageUrl = $"http://user.url/999",
            };

         
            controller.Put(testProfileId, profileToUpdate);

         
            var profileFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testProfileId);
            Assert.NotNull(profileFromDb);

            Assert.Equal(profileToUpdate.Name, profileFromDb.Name);
            Assert.Equal(profileToUpdate.Email, profileFromDb.Email);
            Assert.Equal(profileToUpdate.DateCreated, profileFromDb.DateCreated);
            Assert.Equal(profileToUpdate.ImageUrl, profileFromDb.ImageUrl);
        }

        [Fact]
        public void Delete_Method_Removes_A_Video()
        {
         
            var testProfileId = 99;
            var profiles = CreateTestProfiles(5);
            profiles[0].Id = testProfileId;

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

       
            controller.Delete(testProfileId);

          
            var profileFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testProfileId);
            Assert.Null(profileFromDb);
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
