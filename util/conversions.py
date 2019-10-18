import json
import sys

allocationReport_backup = ''
faculties_backup = ''

content = ''
with open('allocationReport.json', 'r') as target:
    content = target.read()
    allocationReport_backup = json.loads(content)
    content = content.replace('\\n', ' ')
    content = json.loads(content)

with open('allocationReport.json', 'w') as target:
    json.dump(content, target)
    print('Enescaped files')

fac = open("faculties.json", "r")
cou = open("allocationReport.json", "r")

faculties = json.load(fac)
courses = json.load(cou)
faculties_backup = faculties


def facultyFind(faculty_name):
    faculty = [i for i in faculties if i["name"] == faculty_name]
    try:
        return faculty[0]['empId']
    except IndexError as identifier:
        faculty = [i for i in faculties if i["name"]
                   in faculty_name or faculty_name in i['name']]
        return faculty[0]['empId'] if len(faculty) > 0 else 0


for course in courses:
    temp_fac = course["FACULTY"]
    empId = facultyFind(temp_fac)
    course['empId'] = empId

fac.close()
cou.close()

with open('allocationReport.json', 'w') as target:
    json.dump(courses, target)

courses = []
x = []

with open("allocationReport.json", 'r') as target:
    courses: list = json.load(target)
    x = [i for i in courses if i['empId'] == 0]
    # print(x)

for i in x:
    courses.remove(i)

with open('allocationReport.json', 'w') as target:
    json.dump(courses, target)
    print('Saved allocation report with employee id')
    print('Max possible anomaly = ' + str(len(x)))

faculties = []
courses = []


def coursesOf(fac_empid):
    x = [i for i in courses if i['empId'] == fac_empid]
    return x


with open('faculties.json', 'r') as target:
    faculties = json.load(target)

with open('allocationReport.json', 'r') as target:
    courses = json.load(target)

for faculty in faculties:
    resp = coursesOf(faculty['empId'])
    resp = [i for i in resp if i['VENUE'] !=
            "NIL" or i['SLOT'] != "NIL"]  # Eliminates J component
    resp = list(map(lambda x: {'SLOT': x['SLOT'], 'VENUE': x['VENUE'],
                               'COURSECODE': x['CODE'], 'COURSETITLE': x['TITLE']}, resp))
    newResp = []
    for i in resp:
        slots = i['SLOT'].split('+')  # To split B1+TB1 type slots
        for j in slots:
            newResp.append({
                'SLOT': j,
                'VENUE': i['VENUE'],
                'COURSECODE': i['COURSECODE'],
                'COURSETITLE': i['COURSETITLE']
            })
    # faculty.pop('whenwhere', None) DEBUG
    faculty['whenwherewhat'] = newResp


with open('facultyall.json', 'w') as target:  # Final JSON will all the data
    json.dump(faculties, target)
    print('Dumped Facultyall.json')


with open('allocationReport.json', 'w') as target:
    json.dump(allocationReport_backup, target)

with open('faculties.json', 'w') as target:
    json.dump(faculties_backup, target)

sys.stdout.flush()
