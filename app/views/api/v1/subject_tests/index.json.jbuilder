json.array! @subject_tests do |subject_test|
    json.(
        subject_test, 
            :id, 
            :test_date, 
            :result,
            :notes, 
            :created_at, 
            :updated_at,

            json.subject (
                subject_test.subject,
                    :id,
                    :title,
                    :notes,

                    json.language (
                        subject_test.subject.language,
                            :id,
                            :title,
                            :notes
                    )
            ),   
            
            json.season (
                subject_test.season,
                    :id,
                    :title,
                    :order_no
            ),

            json.applicant (
                subject_test.applicant,
                    :id,
                    :first_name,
                    :last_name,
                    :patronymic,
                    :birth_date,
                    :photo_url,
                    :notes,
                    :home_phone,
                    :mobile_phone
            )            
    )
end