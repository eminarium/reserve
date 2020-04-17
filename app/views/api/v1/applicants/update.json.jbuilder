json.(
    @applicant, 
        :id, 
        :first_name,
        :last_name,
        :patronymic,
        :school_grade,
        :home_phone,
        :mobile_phone,
        :age,
        :notes, 
        :created_at, 
        :updated_at,
)

json.user {
    json.id         @applicant.user.id
    json.username   @applicant.user.username
    json.role       @applicant.user.role
}