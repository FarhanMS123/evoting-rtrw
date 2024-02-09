<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UpdateUserInfo extends Notification
{
    use Queueable;

    public $nik;
    public $user;
    public $password;

    /**
     * Create a new notification instance.
     */
    public function __construct($nik, $user, $password = null)
    {
        $this->nik = $nik;
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)->view(
            "mails.update-user-info",
            [
                "nik" => $this->nik,
                "user" => $this->user,
                "password" => $this->password,
            ],
        );
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
