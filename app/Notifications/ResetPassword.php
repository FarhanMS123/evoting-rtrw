<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
// use Illuminate\Notifications\Notification;
use Illuminate\Auth\Notifications\ResetPassword as Notification;

class ResetPassword extends Notification
{
    use Queueable;

    public $user;

    public function __construct($token, $user)
    {
        $this->token = $token;
        $this->user = $user;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function buildMailMessage($url): MailMessage
    {
        return (new MailMessage)->view(
            "mails.reset-password",
            [
                "user" => $this->user,
                "url" => $url,
            ],
        );
    }
}
