json.(
    @reservation, 
        :id, 
        :is_registered,
        :is_sms_sent,
        :is_called,
        :notes, 
        :created_at, 
        :updated_at,
)

json.applicant {
    json.id             @reservation.applicant.id
    json.first_name     @reservation.applicant.first_name
    json.last_name      @reservation.applicant.last_name
    json.patronymic     @reservation.applicant.patronymic
    json.school_grade   @reservation.applicant.school_grade
    json.home_phone     @reservation.applicant.home_phone
    json.mobile_phone   @reservation.applicant.mobile_phone
    json.age            @reservation.applicant.age
    json.notes          @reservation.applicant.notes
    json.created_at     @reservation.applicant.created_at
    json.updated_at     @reservation.applicant.updated_at
}

json.season {
    json.id             @reservation.season.id
    json.title          @reservation.season.title
    json.order_no       @reservation.season.order_no
    json.notes          @reservation.season.notes
    json.created_at     @reservation.season.created_at
    json.updated_at     @reservation.season.updated_at
}

json.shift {
    json.id             @reservation.shift.id
    json.title          @reservation.shift.title
    json.notes          @reservation.shift.notes
    json.created_at     @reservation.shift.created_at
    json.updated_at     @reservation.shift.updated_at
}

json.subject {
    json.id             @reservation.subject.id
    json.title          @reservation.subject.title
    json.notes          @reservation.subject.notes
    json.created_at     @reservation.subject.created_at
    json.updated_at     @reservation.subject.updated_at

    json.language {
        json.id         @reservation.subject.language.id
        json.title      @reservation.subject.language.title
    }
}

json.user {
    json.id             @reservation.user.id
    json.username       @reservation.user.username
    json.role           @reservation.user.role
}