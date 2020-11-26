
// Question 1 - Find any 10 students and their marks
db.getCollection('Students').find({}).limit(10)

// Question 2 - Find the list of students sorted alphabetically by their name (A-Z)
db.getCollection('Students').find({}).sort({ "name": 1})

// Question 3 - Find all students who scored > 50 in homework
db.getCollection('Students').find({ scores: { $elemMatch: { "type": "homework" , score: { $gte: 50}}}})

// Question 4 - Find all students who scored <20 in homework and exam
db.getCollection('Students').find({$and: [
    { scores: { $elemMatch: { "type": "homework" , score: { $lte: 20} }}},
    {scores: {$elemMatch: {"type": "exam" , score: { $lte: 20}}}}]})

// Question 5 - How many students have a quiz, homework and exam score > 85
db.getCollection('Students').find({
  $and: [
    { scores: { $elemMatch: { "type": "homework" , score: { $gte: 85} }}},
    {scores: {$elemMatch: {"type": "exam" , score: { $gte: 85}}}},
    {scores: {$elemMatch: { "type": "quiz" , score: { $gte: 85} }}}]})

// Question 6 - Find the top 10 students with the best exam score
db.getCollection('Students').aggregate([
  {$unwind: '$scores'},
  {$match: {'scores.type': 'exam'}},
  {$sort: {'scores.score': -1}},
  {$limit: 10}])

// Question 7 - Find the bottom 10 students based on quiz score
db.getCollection('Students').aggregate([
  {$unwind: '$scores'},
  {$match: {'scores.type': 'quiz'}},
  {$sort: {'scores.score': 1}},
  {$limit: 10}])

// Question 8 - Find each student’s average mark across all areas
db.getCollection('Students').aggregate([
  {$unwind: '$scores'},
  { $group: { _id: "$_id",  avg: { $avg : "$scores.score"}}} ])

// Question 9 - What is the overall average exam score
