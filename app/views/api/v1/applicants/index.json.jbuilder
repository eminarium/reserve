json.array! @applicants do |applicant|
    json.(
        applicant, 
            :id, 
            :first_name,
            :last_name,
            :patronymic,
            :birth_date,
            :home_phone,
            :mobile_phone,
            :photo_url,
            :notes, 
            :created_at, 
            :updated_at
    )
end