json.applicants {
    json.array! @applicants do |applicant|
        json.(
            applicant, 
                :id, 
                :first_name,
                :last_name,
                :patronymic,
                :age,
                :home_phone,
                :mobile_phone,
                :school_grade,
                :notes, 
                :created_at, 
                :updated_at,
        )

        json.user {
            json.id         applicant.user.id
            json.username   applicant.user.username
            json.role       applicant.user.role
        }
    end
}

if (defined?(@applicants.current_page) || defined?(@applicants.total_pages))
    json.page          @applicants.current_page
    json.pages         @applicants.total_pages
end
