json.subject_tests   {    
    json.array! @subject_tests do |subject_test|
        json.(
            subject_test, 
                :id, 
                :result,
                :notes, 
                :created_at, 
                :updated_at,
        )

        json.subject {
            json.id     subject_test.subject.id
            json.title  subject_test.subject.title
            json.notes  subject_test.subject.notes

            json.language {
                json.id     subject_test.subject.language.id
                json.title  subject_test.subject.language.title
                json.notes  subject_test.subject.language.notes
            }
        }  
        
        json.season {
            json.id         subject_test.season.id
            json.title      subject_test.season.title
            json.order_no   subject_test.season.order_no
        }

        json.applicant {
            json.id             subject_test.applicant.id    
            json.first_name     subject_test.applicant.first_name
            json.last_name      subject_test.applicant.last_name
            json.patronymic     subject_test.applicant.patronymic
            json.school_grade   subject_test.applicant.school_grade
            json.age            subject_test.applicant.age
            json.notes          subject_test.applicant.notes
            json.home_phone     subject_test.applicant.home_phone
            json.mobile_phone   subject_test.applicant.mobile_phone
            json.created_at     subject_test.applicant.created_at
            json.updated_at     subject_test.applicant.updated_at
        }         
        
        json.user {
            json.id             subject_test.user.id
            json.username       subject_test.user.username
            json.role           subject_test.user.role
        }
        
    end
}

if (defined?(@subject_tests.current_page) || defined?(@subject_tests.total_pages))
    json.page          @subject_tests.current_page
    json.pages         @subject_tests.total_pages
end