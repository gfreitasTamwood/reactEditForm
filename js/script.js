jQuery.extend({
    getJsonData: function(urlFilePath){
        let result = null;
        $.ajax({
            docType: "json",
            async: false,
            type: "GET",
            url: urlFilePath,
            success: function(data){
                result = data;
            },
            error: function(xhr,status,error){
                console.error(`You have an error in your file!\n Message: ${status}`);
            }
        });
        return result;
    }
});

const urlStudensFile = './data/students.json';
let studentsList = $.getJsonData(urlStudensFile);


function StudentTable(){
    
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Student Id
                    </th>
                    <th>
                        Student Name
                    </th>
                    <th>
                        Coursework
                    </th>
                    <th>
                        MidTerm
                    </th>
                    <th>
                        Final Exam
                    </th>
                    <th>
                        Final Project
                    </th>
                    <th>
                        Total
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    studentsList.map(
                        (student) => (
                            <StudentTableRow
                                key={student.id}
                                id={student.id}
                                fullName={student.fullName}
                                coursework={student.coursework}
                                midTerm={student.midTerm}
                                finalExam={student.finalExam}
                                finalProject={student.finalProject}
                            />
                        )
                    )
                }
            </tbody>
        </table>
    );
}

function StudentTableRow(props){
    let total = (
        props.coursework +
        props.midTerm +
        props.finalExam +
        props.finalProject
    )/4;
    return (
        <tr>
            <td>
                {props.id}
            </td>
            <td>
                {props.fullName}
            </td>
            <td>
                {props.coursework}
            </td>
            <td>
                {props.midTerm}
            </td>
            <td>
                {props.finalExam}
            </td>
            <td>
                {props.finalProject}
            </td>
            <td>
                {total}
            </td>
            <td>
                <button name={props.id}>Edit Student</button>
            </td>
        </tr>
    );
}

function FormEditStudent(){
    return(
        <form className="hidden">
            <input type="text" name="studentName" id="studentName" placeholder="Student Name"/>
            <input type="number" name="coursework" id="courswork" placeholder="Coursework"/>
            <input type="number" name="midTerm" id="midTerm" placeholder="Midterm"/>
            <input type="number" name="finalProject" id="finalProject" placeholder="Final Project"/>
            <input type="number" name="finalExam" id="finalExam" placeholder="Final Exam"/>
            <input type="submit" value="Update Student"/>
        </form>
    );
}


function App(){
    $("table").ready(function(){
        $("button").click(function(){
            $("form").show();
            console.log(studentsList[(this.name)-1]);
        });
    });

    return (
        <React.Fragment>
            <FormEditStudent/>
            <StudentTable/>
        </React.Fragment>
    );
}

const htmlRoot = ReactDOM.createRoot(
    document.getElementById("root")
);

htmlRoot.render(<App/>);