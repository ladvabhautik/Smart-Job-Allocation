{
  "info": {
    "name": "Smart Job Allocation API",
    "_postman_id": "my-collection",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "header": [],
        "url": { "raw": "http://localhost:5000/api/auth/register", "protocol": "http", "host": ["localhost:5000"], "path": ["api","auth","register"] },
        "body": { "mode":"raw", "raw": "{\n \"name\":\"Admin\",\n \"email\":\"admin@test.com\",\n \"password\":\"123456\",\n \"role\":\"admin\"\n}"}
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [],
        "url": { "raw": "http://localhost:5000/api/auth/login", "protocol": "http", "host": ["localhost:5000"], "path": ["api","auth","login"] },
        "body": { "mode":"raw", "raw": "{\n \"email\":\"admin@test.com\",\n \"password\":\"123456\"\n}"}
      }
    },
    {
      "name": "Create ZIP",
      "request": {
        "method":"POST",
        "header":[{ "key": "Authorization","value": "Bearer {{token}}" }],
        "url":{"raw":"http://localhost:5000/api/zips","protocol":"http","host":["localhost:5000"],"path":["api","zips"]},
        "body":{"mode":"raw","raw":"{\n\"zipCode\":\"12345\",\n\"mobility\":80,\n\"businessActivity\":70,\n\"demographicFit\":60,\n\"seasonalDemand\":50\n}"}
      }
    },
    {
      "name":"Create Contractor",
      "request":{
        "method":"POST",
        "header":[{"key":"Authorization","value":"Bearer {{token}}"}],
        "url":{"raw":"http://localhost:5000/api/contractors","protocol":"http","host":["localhost:5000"],"path":["api","contractors"]},
        "body":{"mode":"raw","raw":"{\n\"name\":\"John\",\n\"email\":\"john@test.com\",\n\"trade\":\"Plumbing\",\n\"rating\":4,\n\"completionRate\":90,\n\"avgResponseTime\":3,\n\"activeJobs\":0,\n\"zipCode\":\"12345\"\n}"}
      }
    },
    {
      "name":"Create Job",
      "request":{
        "method":"POST",
        "header":[{"key":"Authorization","value":"Bearer {{token}}"}],
        "url":{"raw":"http://localhost:5000/api/jobs","protocol":"http","host":["localhost:5000"],"path":["api","jobs"]},
        "body":{"mode":"raw","raw":"{\n\"title\":\"Fix Sink\",\n\"description\":\"Leaky sink\",\n\"zipCode\":\"12345\",\n\"tradeRequired\":\"Plumbing\",\n\"urgency\":\"Urgent\"\n}"}
      }
    },
    {
      "name":"Create Bid",
      "request":{
        "method":"POST",
        "header":[{"key":"Authorization","value":"Bearer {{token}}"}],
        "url":{"raw":"http://localhost:5000/api/bids","protocol":"http","host":["localhost:5000"],"path":["api","bids"]},
        "body":{"mode":"raw","raw":"{\n\"jobId\":\"{{jobId}}\",\n\"contractorId\":\"{{contractorId}}\",\n\"distance\":5\n}"}
      }
    },
    {
      "name":"Get Ranked Bids",
      "request":{
        "method":"GET",
        "header":[{"key":"Authorization","value":"Bearer {{token}}"}],
        "url":{"raw":"http://localhost:5000/api/bids/{{jobId}}","protocol":"http","host":["localhost:5000"],"path":["api","bids","{{jobId}}"]}
      }
    },
    {
      "name":"Admin Override",
      "request":{
        "method":"PATCH",
        "header":[{"key":"Authorization","value":"Bearer {{token}}"}],
        "url":{"raw":"http://localhost:5000/api/bids/override/{{bidId}}","protocol":"http","host":["localhost:5000"],"path":["api","bids","override","{{bidId}}"]},
        "body":{"mode":"raw","raw":"{\n\"adminOverrideRank\":1\n}"}
      }
    }
  ]
}