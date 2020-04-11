json.array! @subject_tests do |subject_test|
    json.(
        subject_test, 
            :id, 
            :test_date, 
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
        json.birth_date     subject_test.applicant.birth_date
        json.photo_url      subject_test.applicant.photo_url
        json.notes          subject_test.applicant.notes
        json.home_phone     subject_test.applicant.home_phone
        json.mobile_phone   subject_test.applicant.mobile_phone
    }              
    
end