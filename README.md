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
