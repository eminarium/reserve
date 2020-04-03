json.array! @reservations do |reservation|
    json.(
        reservation, 
            :id, 
            :is_registered,
            :is_sms_sent,
            :is_called,
            :notes, 
            :created_at, 
            :updated_at,

            json.applicant (
                reservation.applicant,
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
            ),

            json.season (
                reservation.season,
                    :id,
                    :title,
                    :order_no,
                    :notes,
                    :created_at,
                    :updated_at
            ),

            json.shift (
                reservation.shift,
                    :id,
                    :title,
                    :notes,
                    :created_at,
                    :updated_at
            ),

            json.subject (
                reservation.subject,
                    :id,
                    :title,
                    :notes,
                    :created_at,
                    :updated_at
            )
    )
end