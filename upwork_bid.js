var id = window.location.pathname.split('/').pop().slice(3)

var xhr = new XMLHttpRequest();

xhr.open('GET', `https://www.upwork.com/ab/proposals/api/v4/application/bids?jobUid=${id}`, true);

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log('Response:', JSON.parse(xhr.responseText).bids.map((item, idx) => item.amount));
  } else {
    console.error('Request failed with status:', xhr.status);
  }
};

xhr.onerror = function() {
  console.error('There was a problem with the request.');
};

xhr.send();

/////////////////////////////////
const getId = () => {
  var id = ''
  var startID = false

  for (let c of window.location.pathname) {
    if ('0123456789'.search(c) === -1) startID = false
    if (c === '~') {
      startID = true
      continue
    }
    if (startID) id += c
  }

  if (id.startsWith('02')) {
    id = id.slice(2)
  }

  return id
}

const getBoostedAmount = () => {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', `https://www.upwork.com/ab/proposals/api/v4/application/bids?jobUid=${getId()}`, true);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('Boosted Connect Amount:', JSON.parse(xhr.responseText).bids.map((item, idx) => item.amount));
    } else {
      console.error('Request failed with status:', xhr.status);
    }
  };

  xhr.onerror = function() {
    console.error('There was a problem with the request.');
  };

  xhr.send();
}

getBoostedAmount()

////////////////////////////////
const query = {
  query: '\n  query JobAuthDetails($id: ID!) {\n    user {\n      permissions(\n        filter: {\n          resourceType_eq: OPENING\n          actions_any: "flag"\n          performExternalChecks_eq: true\n          returnAllTeams: true\n        }\n      ) {\n        edges {\n          node {\n            access\n            organization {\n              id\n            }\n          }\n        }\n      }\n    }\n    jobAuthDetails(id: $id) {\n      opening {\n        job {\n          status\n          category {\n            name\n            urlSlug\n          }\n          categoryGroup {\n            name\n            urlSlug\n          }\n          budget {\n            amount\n            currencyCode\n          }\n          info {\n            ciphertext\n            id\n            type\n            access\n            title\n            hideBudget\n            createdOn\n            notSureProjectDuration\n            notSureFreelancersToHire\n            notSureExperienceLevel\n            notSureLocationPreference\n            premium\n          }\n          segmentationData {\n            customValue\n            label\n            name\n            skill {\n              description\n              externalLink\n              prettyName\n              skill\n              id\n            }\n            sortOrder\n            type\n            value\n          }\n          annotations {\n            tags\n          }\n          postedOn\n          publishTime\n          sourcingTime\n          startDate\n          deliveryDate\n          workload\n          engagementDuration {\n            label\n            weeks\n          }\n          extendedBudgetInfo {\n            hourlyBudgetMin\n            hourlyBudgetMax\n            hourlyBudgetType\n          }\n          contractorTier\n          description\n          clientActivity {\n            lastBuyerActivity\n            totalApplicants\n            totalHired\n            totalInvitedToInterview\n            unansweredInvites\n            invitationsSent\n            numberOfPositionsToHire\n          }\n          sandsData {\n            occupation {\n              freeText\n              ontologyId\n              prefLabel\n              id\n            }\n            ontologySkills {\n              groupId\n              id\n              freeText\n              prefLabel\n            }\n            additionalSkills {\n              groupId\n              id\n              freeText\n              prefLabel\n            }\n          }\n          attachments {\n            fileName\n            length\n            uri\n          }\n        }\n        qualifications {\n          countries\n          earnings\n          group {\n            groupId\n            groupLogo\n            groupName\n          }\n          groupRecno\n          languages\n          localDescription\n          localFlexibilityDescription\n          localMarket\n          location {\n            city\n            country\n            countryTimezone\n            offsetFromUtcMillis\n            state\n            worldRegion\n          }\n          locationCheckRequired\n          locations {\n            id\n            type\n          }\n          minJobSuccessScore\n          minOdeskHours\n          onSiteType\n          prefEnglishSkill\n          regions\n          risingTalent\n          shouldHavePortfolio\n          states\n          tests\n          timezones\n          type\n        }\n        questions {\n          question\n          position\n        }\n      }\n      buyer {\n        info {\n          location {\n            offsetFromUtcMillis\n            countryTimezone\n            city\n            country\n          }\n          stats {\n            feedbackCount\n            score\n            totalCharges {\n              amount\n            }\n            totalAssignments\n            activeAssignmentsCount\n            hoursCount\n            totalJobsWithHires\n          }\n          company {\n            companyId\n            name\n            isEDCReplicated\n            contractDate\n            profile {\n              industry\n              size\n            }\n          }\n          jobs {\n            openCount\n            postedCount\n            openJobs {\n              id\n              isPtcPrivate\n              ciphertext\n              title\n              type\n            }\n          }\n          avgHourlyJobsRate {\n            amount\n          }\n        }\n        enterprise\n        isPaymentMethodVerified\n        workHistory {\n          isEDCReplicated\n          isPtcPrivate\n          startDate\n          endDate\n          totalCharge\n          totalHours\n          jobInfo {\n            title\n            id\n            access\n            type\n            ciphertext\n          }\n          contractorInfo {\n            contractorName\n            accessType\n            ciphertext\n          }\n          rate {\n            amount\n          }\n          feedback {\n            feedbackSuppressed\n            score\n            comment\n          }\n          feedbackToClient {\n            feedbackSuppressed\n            score\n            comment\n          }\n          isPtcJob\n          status\n        }\n      }\n      currentUserInfo {\n        owner\n        freelancerInfo {\n          profileState # *\n          applied\n          application {\n            vjApplicationId\n          }\n          pendingInvite {\n            inviteId\n          }\n          contract {\n            contractId\n            status\n          }\n          devProfileCiphertext\n          hired\n\n          hourlyRate {\n            amount\n          }\n          qualificationsMatches {\n            matches {\n              clientPreferred\n              clientPreferredLabel\n              freelancerValue\n              freelancerValueLabel\n              qualification\n              qualified\n            }\n          }\n        }\n      }\n      hiredApplicantNames\n      similarJobs {\n        id\n        ciphertext\n        title\n        snippet\n      }\n      workLocation {\n        onSiteCity\n        onSiteCountry\n        onSiteReason\n        onSiteReasonFlexible\n        onSiteState\n        onSiteType\n      }\n      \n      applicationContext {\n      \n        freelancerAllowed\n        clientAllowed\n      \n      \n        locationVerificationStatus\n        openingMatchesDomesticContext\n        userEligibleForIdvLimitedAdmission\n      \n      }\n    \n      \n        specializedProfileOccupationId\n      \n      \n      phoneVerificationStatus { status }\n    \n      \n      applicantsBidsStats {\n        avgRateBid {\n          amount\n          currencyCode\n        }\n        minRateBid {\n          amount\n          currencyCode\n        }\n        maxRateBid {\n          amount\n          currencyCode\n        }\n      }\n    \n    }\n  }\n',
}

const getId = () => {
  var id = ''
  var startID = false

  for (let c of window.location.href) {
    if (!'0123456789'.includes(c)) startID = false
    if (c === '~') {
      startID = true
      continue
    }
    if (startID) id += c
    if (id.length>=2 && id[0] === '0' && !id.startsWith('02')) {
      startID = false
      id = ''
    }
  }

  if (id.startsWith('02')) {
    id = id.slice(2)
  }

  return id
}

const getBoostedAmount = () => {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', `https://www.upwork.com/ab/proposals/api/v4/application/bids?jobUid=${getId()}`, true);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('Boosted Connect Amount:', JSON.parse(xhr.responseText).bids.map((item, idx) => item.amount));
    } else {
      console.error('Request failed with status:', xhr.status);
    }
  };

  xhr.onerror = function() {
    console.error('There was a problem with the request.');
  };

  xhr.send();
}

const bidInfo = () => {
  var xhr = new XMLHttpRequest();

  xhr.open('POST', `https://www.upwork.com/api/graphql/v1?alias=gql-query-user-jobauthdetails`, true);

  xhr.setRequestHeader('Authorization', `Bearer oauth2v2_38e269b3a9e53c2bf289828e766d2b3d`);
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText)

      const time = new Date() - new Date(data.data.jobAuthDetails.opening.job.clientActivity.lastBuyerActivity)
      console.log('Job Info:', [ data.data.jobAuthDetails.opening.job.clientActivity.totalApplicants, (time>3600000?`${time/1000/3600} hours`:`${time/1000/60} mins`) ])
    } else {
      console.error('Request failed with status:', xhr.status);
    }
  };

  xhr.onerror = function() {
    console.error('There was a problem with the request.');
  };

  xhr.send(JSON.stringify({ ...query, variables: { id: `~02${getId()}` } }));
}

const start = () => {
  getBoostedAmount()
  bidInfo()
}

start()