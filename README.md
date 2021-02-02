# MongoDb-Kata

run docker compose
`docker-compose -f docker/docker-compose.yml -p mongoKata up`

run the below to import data:

`brew install mongodb/brew/mongodb-database-tools`

`mongoimport --db mongo_kata --collection Students --file ./data/Students.json`


## Questions

1. Find any 10 students and their marks 

2. Find the list of students sorted alphabetically by their name (A-Z)

3. Find all students who scored > 50 in homework

4. Find all students who scored <20 in homework and exam

5. How many students have a quiz, homework and exam score > 85

6. Find the top 10 students with the best exam score

7. Find the bottom 10 students based on quiz score

8. Find each student’s average mark across all areas

9. What is the overall average exam score for all students


# Part 2 (Hobbies)

## Insert / Update / Delete

1. Insert a document for William. He has no hobbies.

`db.getCollection('Hobbies').insertOne({ "name": "William"})`

2. Using one query - add 3 more people to list: 
    - 'Beethoven' who loves 'music' 
    - 'Bugs Bunny' who eats 'carrots' all day
    - 'Snoopy' who has no hobbies
    
`db.getCollection('Hobbies').insertMany([
{ "name": "Beethoven", "hobbies": ["music"] },
{ "name": "Bugs Bunny", "hobbies": [ "carrots"] },
{ "name": "Snoopy" }
])`

3. Update William's document to include a hobby :'jigsaw puzzles'

`db.getCollection('Hobbies').updateOne( {"name":"William"}, { $set: {"hobbies":[ "jigsaw puzzles"]}})`

4. Update everyone's records to include another column `likes_dessert` = true   
`db.getCollection('Hobbies').updateMany( {}, 
{ $set: {"likesDessert": true}})`

5. Delete the document for `Bugs Bunny`

`db.getCollection('Hobbies').deleteOne({"name": "Bugs Bunny"})`

6. Delete all the people from the DB if they have 0 hobbies

`db.getCollection('Hobbies').deleteMany({ "hobbies": { $exists: false }})`


## Search (regex + string search)

1. Find all the people who have a space in their name

`db.getCollection('Hobbies').find({ "name": { $regex: " "} })
db.getCollection('Hobbies').find({ "name": { $regex: "\s"} })`

2. Find everyone whose Name starts with a vowel

`db.getCollection('Hobbies').find({ "name": { $regex: "^[AEIOU]"} })`

3. Find everyone whose name starts with a consonant
`db.getCollection('Hobbies').find({ "name": { $regex: "^[^AEIOU]"} })`


4. Find all the hobbies that contains the letter `b`
`db.getCollection('Hobbies').find({hobbies: {$regex: "[b]"}})`

5. Search for everyone whose name contains `Nicolas`

`db.getCollection('Hobbies').find({name: { $regex: "^Nicolas"}})`

6. Search for everyone who has the name Nicolas - case-insensitive 


## Indexes

1. Create an index on the name. Look for it in the list of indexes

`db.getCollection('Hobbies').createIndex({"name" : 1})`


## Complex aggregations (Hobbies and Students)

1. Find the student with the most hobbies and the highest exam score

1. Find the students with 2 hobbies and the has the lowest homework score




join hobbies with students
`db.getCollection('Hobbies').aggregate([
   { $lookup:
      {
        from: 'Students',
        localField: 'name',
        foreignField: 'name',
        as: 'matchingStudents'
      }
  }
 ])`


count number of hobbies

`db.getCollection('Hobbies').aggregate([
    {
       $project: {
          name: 1,
          numberOfHobbies: { $cond: { if: { $isArray: "$hobbies" }, then: { $size: "$hobbies" }, else: "0"} }
       }
    }
 ] )`
